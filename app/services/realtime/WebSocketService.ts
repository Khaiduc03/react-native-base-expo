import { Platform } from "react-native"
import EventBus from "./EventBus"
import { WS_MESSAGE_CHANNEL } from "./events"

export type WebSocketServiceOptions = {
  url: string
  getAuthToken?: () => Promise<string | undefined> | string | undefined
  protocols?: string | string[]
  heartbeatIntervalMs?: number
  reconnectBaseDelayMs?: number
  reconnectMaxDelayMs?: number
  maxReconnectAttempts?: number | null // null=infinite
  reconnectStrategy?: "exponential" | "linear" | "fixed"
}

export type Subscription = {
  topic: string
}

export type OutboundMessage = {
  type: string
  topic?: string
  data?: any
  [key: string]: any
}

export class WebSocketService {
  private options: WebSocketServiceOptions
  private socket: WebSocket | null = null
  private isConnecting = false
  private reconnectAttempt = 0
  private heartbeatTimer?: ReturnType<typeof setInterval>
  private subscriptions = new Set<string>()
  private closedByUser = false

  constructor(options: WebSocketServiceOptions) {
    this.options = {
      heartbeatIntervalMs: 25_000,
      reconnectBaseDelayMs: 750,
      reconnectMaxDelayMs: 10_000,
      maxReconnectAttempts: null,
      reconnectStrategy: "exponential",
      ...options,
    }
  }

  async connect() {
    if (this.socket || this.isConnecting) return
    this.isConnecting = true
    EventBus.emit("ws:connecting", undefined)

    try {
      const token = await this.resolveToken()
      const url = this.buildUrlWithAuth(this.options.url, token)
      const protocols = this.options.protocols
      this.socket = new WebSocket(url, protocols as any)

      this.attachSocketHandlers()
    } catch (error) {
      this.isConnecting = false
      EventBus.emit("ws:error", { error })
      this.scheduleReconnect()
    }
  }

  // Await until connected (or timeout/closed)
  async connectAndWait(timeoutMs: number = 10_000) {
    if (this.isOpen()) return
    await this.connect()

    return new Promise<void>((resolve, reject) => {
      let settled = false
      const timeout = setTimeout(() => {
        cleanup()
        if (!settled) reject(new Error("WebSocket connect timeout"))
      }, timeoutMs)

      const offOpen = EventBus.on("ws:open", () => {
        settled = true
        cleanup()
        resolve()
      })
      const offClosed = EventBus.on("ws:closed", ({ code, reason }) => {
        if (!settled) {
          settled = true
          cleanup()
          reject(new Error(`WebSocket closed during connect (${code}) ${reason}`))
        }
      })
      const offError = EventBus.on("ws:error", () => {
        // keep waiting until timeout; errors may occur during handshake
      })

      function cleanup() {
        clearTimeout(timeout)
        offOpen()
        offClosed()
        offError()
      }
    })
  }

  // Convenience: ensure connection is open before proceeding
  async ensureConnected(timeoutMs?: number) {
    if (!this.isOpen()) {
      await this.connectAndWait(timeoutMs)
    }
  }

  disconnect(code?: number, reason?: string) {
    this.closedByUser = true
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer)
    if (this.socket) {
      try {
        this.socket.close(code, reason)
      } catch {}
      this.socket = null
    }
  }

  isOpen() {
    return this.socket?.readyState === WebSocket.OPEN
  }

  send(message: OutboundMessage) {
    if (!this.isOpen()) return false
    try {
      this.socket!.send(JSON.stringify(message))
      return true
    } catch (error) {
      EventBus.emit("ws:error", { error })
      return false
    }
  }

  // Convenience helper: publish to a topic/event
  publish(event: string | WS_MESSAGE_CHANNEL, payload: any) {
    // Server expects { event, payload }
    return this.send({ event, payload } as any)
  }

  subscribe(topic: string) {
    if (this.subscriptions.has(topic)) return
    this.subscriptions.add(topic)
    if (this.isOpen()) {
      this.send({ type: "subscribe", topic })
      EventBus.emit("ws:subscribed", { topic })
    }
  }

  unsubscribe(topic: string) {
    if (!this.subscriptions.has(topic)) return
    this.subscriptions.delete(topic)
    if (this.isOpen()) {
      this.send({ type: "unsubscribe", topic })
      EventBus.emit("ws:unsubscribed", { topic })
    }
  }

  private attachSocketHandlers() {
    if (!this.socket) return

    this.socket.onopen = () => {
      this.isConnecting = false
      this.reconnectAttempt = 0
      EventBus.emit("ws:open", undefined)
      // this.startHeartbeat() // Heartbeat is handled by the server
      // resubscribe
      for (const topic of this.subscriptions) {
        this.send({ type: "subscribe", topic })
        EventBus.emit("ws:subscribed", { topic })
      }
    }

    this.socket.onmessage = (ev) => {
      let data: any = undefined
      try {
        data = typeof ev.data === "string" ? JSON.parse(ev.data) : ev.data
      } catch {
        data = ev.data
      }
      EventBus.emit("ws:message", { raw: data })

      // Normalize topic/event mode: support {type, topic, data} or {event, payload}
      if (data && typeof data === "object") {
        const topic = data.topic ?? data.channel ?? data.event
        const payload = data.data ?? data.payload ?? data
        const eventName: string | undefined = data.event
        const eventPayload: any = data.payload ?? payload

        // Emit normalized bus message
        if (topic || eventName) {
          EventBus.emit("ws:topic", {
            topic,
            data: payload,
            event: eventName,
            payload: eventPayload,
          })
        }

        // Emit direct channel by event name
        if (eventName) {
          EventBus.emit(eventName as any, eventPayload)
        }
        // Also emit by topic if present
        if (topic) {
          EventBus.emit(topic as any, payload)
        }
      }
    }

    this.socket.onerror = (ev: any) => {
      EventBus.emit("ws:error", { error: ev?.message ?? ev })
    }

    this.socket.onclose = (ev) => {
      if (this.heartbeatTimer) clearInterval(this.heartbeatTimer)
      EventBus.emit("ws:closed", { code: ev.code, reason: ev.reason })
      this.socket = null
      if (!this.closedByUser) this.scheduleReconnect()
    }
  }

  private startHeartbeat() {
    if (this.heartbeatTimer) clearInterval(this.heartbeatTimer)
    this.heartbeatTimer = setInterval(() => {
      if (!this.isOpen()) return
      try {
        this.socket!.send(JSON.stringify({ type: "ping", t: Date.now() }))
      } catch (error) {
        EventBus.emit("ws:error", { error })
      }
    }, this.options.heartbeatIntervalMs)
  }

  private scheduleReconnect() {
    if (this.closedByUser) return
    const { maxReconnectAttempts } = this.options
    if (maxReconnectAttempts !== null && this.reconnectAttempt >= maxReconnectAttempts!) return

    this.reconnectAttempt += 1
    const delay = this.computeBackoffDelay(this.reconnectAttempt)
    EventBus.emit("ws:reconnecting", { attempt: this.reconnectAttempt })
    setTimeout(async () => {
      await this.connect()
      if (this.isOpen()) {
        EventBus.emit("ws:reconnected", { attempt: this.reconnectAttempt })
      }
    }, delay)
  }

  private computeBackoffDelay(attempt: number) {
    const {
      reconnectBaseDelayMs = 750,
      reconnectMaxDelayMs = 10_000,
      reconnectStrategy = "exponential",
    } = this.options
    switch (reconnectStrategy) {
      case "fixed": {
        const jitter = Math.round(reconnectBaseDelayMs * 0.1 * Math.random())
        return reconnectBaseDelayMs + jitter
      }
      case "linear": {
        const linear = Math.min(reconnectMaxDelayMs, reconnectBaseDelayMs * attempt)
        const jitter = Math.round(linear * 0.2 * Math.random())
        return linear + jitter
      }
      case "exponential":
      default: {
        const exp = Math.min(reconnectMaxDelayMs, reconnectBaseDelayMs * Math.pow(2, attempt - 1))
        const jitter = Math.round(exp * 0.2 * Math.random())
        return exp + jitter
      }
    }
  }

  private buildUrlWithAuth(baseUrl: string, token?: string) {
    if (!token) return baseUrl
    try {
      const url = new URL(baseUrl)
      url.searchParams.set("token", token)
      return url.toString()
    } catch {
      // Fallback: if invalid URL, append query directly
      const sep = baseUrl.includes("?") ? "&" : "?"
      return `${baseUrl}${sep}token=${encodeURIComponent(token)}`
    }
  }

  private async resolveToken() {
    const { getAuthToken } = this.options
    if (!getAuthToken) return undefined
    const res = typeof getAuthToken === "function" ? await getAuthToken() : getAuthToken
    return res ?? undefined
  }
}

// Singleton factory
let singleton: WebSocketService | null = null
export function getWebSocketService(options?: Partial<WebSocketServiceOptions>) {
  if (singleton) return singleton
  if (!options?.url) {
    throw new Error("WebSocketService requires a URL on first initialization")
  }
  singleton = new WebSocketService(options as WebSocketServiceOptions)
  return singleton
}

export default WebSocketService
