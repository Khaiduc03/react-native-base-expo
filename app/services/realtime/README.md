# Realtime Service (WebSocket + EventBus)

Global WebSocket with reconnect, heartbeat, auth token, and topic subscriptions. Integrated with a typed EventBus for UI updates.

## Quick Start

```ts
import { getWebSocketService, EventBus, WS_MESSAGE_CHANNEL } from "@/services/realtime"

// 1) Init singleton once (e.g., App startup)
const ws = getWebSocketService({
  url: "wss://example.com/ws",
  reconnectStrategy: "exponential", // default: exponential | linear | fixed
})

// Option A: connect then await until OPEN
await ws.connectAndWait()
// Option B: ensure connected when needed
await ws.ensureConnected()

// 2) Publish using enum event name (server expects { event, payload })
ws.publish(WS_MESSAGE_CHANNEL.SUBSCRIBE_TICKER_TAPE, {
  symbols: "BTCUSD,AAPL,ETHUSD,MSFT,TSLA,NVDA",
})

// 3) Listen by enum event name; payload is typed
const off = EventBus.on(WS_MESSAGE_CHANNEL.TICKER_TAPE_UPDATE, (payload) => {
  // payload is server payload for ticker_tape_update
})

// 4) Unsubscribe when done
off()
```

## API

### WebSocketService

- `connect()` — start connection (non-blocking)
- `connectAndWait(timeoutMs = 10000)` — await until connection is OPEN or timeout
- `ensureConnected(timeoutMs?)` — ensure socket is open, otherwise wait
- `disconnect(code?, reason?)` — close connection
- `isOpen()` — boolean
- `publish(event: string | WS_MESSAGE_CHANNEL, payload: any)` — send `{ event, payload }`
- `subscribe(topic: string)` / `unsubscribe(topic: string)` — optional topic helpers

### EventBus

- Emits connection lifecycle events: `ws:connecting`, `ws:open`, `ws:closed`, `ws:error`, `ws:reconnecting`, `ws:reconnected`, `ws:message`
- Normalized message channel: `ws:topic` with `{ topic?, event?, data?, payload? }`
- Dynamic channels by server event name and topic name. Example:

```ts
EventBus.on(WS_MESSAGE_CHANNEL.TICKER_TAPE_UPDATE, (payload) => {
  /* ... */
})
```

## Reconnect Strategies

- `exponential` (default): base \* 2^(attempt-1), capped by max, with jitter
- `linear`: base \* attempt, capped by max, with jitter
- `fixed`: base delay each time, with light jitter

Config options:

- `reconnectBaseDelayMs` (default 750)
- `reconnectMaxDelayMs` (default 10000)
- `maxReconnectAttempts` (default null = infinite)

## Types & Enums

Defined in `app/services/realtime/events.ts`:

```ts
export enum WS_MESSAGE_CHANNEL {
  SUBSCRIBE_TICKER_TAPE = "subscribe_ticker_tape",
  TICKER_TAPE_UPDATE = "ticker_tape_update",
}

export type SubscribeTickerTapePayload = { symbols: string }
export type TickerResponse = unknown // refine to your schema
```

You can extend these enums and payload types to fit your backend events. Make sure to add the mapping in `EventBus.ts` if you want typed payloads for new channels.
