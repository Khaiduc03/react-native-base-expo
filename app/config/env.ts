interface Environment {
  GOOGLE_WEB_CLIENT_ID: string
  GOOGLE_IOS_CLIENT_ID?: string
  GOOGLE_ANDROID_CLIENT_ID?: string
  API_URL: string
  API_URL_PYTHON: string
}

export const ENV = {
  development: {
    GOOGLE_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "",
    GOOGLE_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || "",
    GOOGLE_ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || "",
    API_URL: process.env.API_URL || "https://api.rss2json.com/v1/",
    API_URL_PYTHON: process.env.API_URL_PYTHON || "",
  },
  production: {
    GOOGLE_WEB_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || "",
    GOOGLE_IOS_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || "",
    GOOGLE_ANDROID_CLIENT_ID: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || "",
    API_URL: process.env.API_URL || "https://api.rss2json.com/v1/",
    API_URL_PYTHON: process.env.API_URL_PYTHON || "",
  },
}

export const getEnvironment = (): Environment => {
  const environment = process.env.NODE_ENV || "development"
  return ENV[environment as keyof typeof ENV]
}

export default getEnvironment
