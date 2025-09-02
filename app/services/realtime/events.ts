export enum WS_MESSAGE_CHANNEL {
  SUBSCRIBE_TICKER_TAPE = "subscribe_ticker_tape",
  TICKER_TAPE_UPDATE = "ticker_tape_update",
}

// Example payloads — extend to your needs
export type SubscribeTickerTapePayload = {
  symbols: string // e.g. "BTCUSD,AAPL,ETHUSD,MSFT,TSLA,NVDA"
}

// You can refine this based on your server schema
export type TickerResponse = unknown
