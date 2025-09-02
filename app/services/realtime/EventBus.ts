import type { Emitter } from "mitt"
import mitt from "mitt"
import { WS_MESSAGE_CHANNEL } from "./events"
import type { TickerResponse } from "./events"

// Map enum channels to payload types
export type ChannelEventPayloads = {
  [WS_MESSAGE_CHANNEL.SUBSCRIBE_TICKER_TAPE]: unknown
  [WS_MESSAGE_CHANNEL.TICKER_TAPE_UPDATE]: TickerResponse
}

export type AppEvents = ({
  // Connection lifecycle
  "ws:connecting": undefined
  "ws:open": undefined
  "ws:closed": { code: number; reason: string }
  "ws:error": { error: unknown }
  "ws:reconnecting": { attempt: number }
  "ws:reconnected": { attempt: number }
  "ws:message": { raw: any }

  // Domain-specific, can extend as needed
  "ws:subscribed": { topic: string }
  "ws:unsubscribed": { topic: string }
  "ws:topic": { topic?: string; event?: string; data?: any; payload?: any }
} & ChannelEventPayloads) &
  Record<string, any>

class EventBusClass {
  private emitter: Emitter<AppEvents>

  constructor() {
    this.emitter = mitt<AppEvents>()
  }

  on<Key extends keyof AppEvents>(type: Key, handler: (event: AppEvents[Key]) => void) {
    this.emitter.on(type, handler as any)
    return () => this.off(type, handler)
  }

  off<Key extends keyof AppEvents>(type: Key, handler: (event: AppEvents[Key]) => void) {
    this.emitter.off(type, handler as any)
  }

  emit<Key extends keyof AppEvents>(type: Key, event: AppEvents[Key]) {
    this.emitter.emit(type, event as any)
  }

  clearAll() {
    ;(this.emitter as any).all.clear?.()
  }
}

export const EventBus = new EventBusClass()
export default EventBus
