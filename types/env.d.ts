declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: string
      EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID?: string
      EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID?: string
      API_URL: string
      NODE_ENV: "development" | "production"
    }
  }
}

export {}
