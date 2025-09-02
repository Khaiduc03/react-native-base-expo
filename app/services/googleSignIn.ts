import { GoogleSignin, statusCodes, type User } from "@react-native-google-signin/google-signin"
import { getEnvironment } from "@/config/env"

export interface GoogleUser {
  idToken: string
  serverAuthCode: string
  scopes: string[]
  user: {
    id: string
    name: string
    givenName: string
    familyName: string
    email: string
    photo: string
  }
}

class GoogleSignInService {
  private isConfigured = false

  configure() {
    if (this.isConfigured) return

    const env = getEnvironment()

    GoogleSignin.configure({
      webClientId: env.GOOGLE_WEB_CLIENT_ID,
      iosClientId: env.GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true,
      hostedDomain: "",
      forceCodeForRefreshToken: true,
    })

    this.isConfigured = true
  }

  async signIn(): Promise<GoogleUser> {
    try {
      this.configure()

      await GoogleSignin.hasPlayServices()
      const response = await GoogleSignin.signIn()

      if (response.type === "cancelled") {
        throw new Error("Đăng nhập bị hủy")
      }

      const userInfo = response.data

      return {
        idToken: userInfo.idToken || "",
        serverAuthCode: userInfo.serverAuthCode || "",
        scopes: userInfo.scopes || [],
        user: {
          id: userInfo.user.id,
          name: userInfo.user.name || "",
          givenName: userInfo.user.givenName || "",
          familyName: userInfo.user.familyName || "",
          email: userInfo.user.email,
          photo: userInfo.user.photo || "",
        },
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error("Đăng nhập bị hủy")
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error("Đăng nhập đang trong quá trình xử lý")
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error("Google Play Services không khả dụng")
      } else {
        throw new Error(`Lỗi đăng nhập: ${error.message}`)
      }
    }
  }

  async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut()
    } catch (error: any) {
      throw new Error(`Lỗi đăng xuất: ${error.message}`)
    }
  }

  async isSignedIn(): Promise<boolean> {
    try {
      return GoogleSignin.hasPreviousSignIn()
    } catch (error: any) {
      console.error("Lỗi kiểm tra trạng thái đăng nhập:", error)
      return false
    }
  }

  async getCurrentUser(): Promise<GoogleUser | null> {
    try {
      const isSignedIn = await this.isSignedIn()
      if (!isSignedIn) return null

      const userInfo = GoogleSignin.getCurrentUser()
      if (!userInfo) return null

      return {
        idToken: userInfo.idToken || "",
        serverAuthCode: userInfo.serverAuthCode || "",
        scopes: userInfo.scopes || [],
        user: {
          id: userInfo.user.id,
          name: userInfo.user.name || "",
          givenName: userInfo.user.givenName || "",
          familyName: userInfo.user.familyName || "",
          email: userInfo.user.email,
          photo: userInfo.user.photo || "",
        },
      }
    } catch (error: any) {
      console.error("Lỗi lấy thông tin người dùng:", error)
      return null
    }
  }

  async revokeAccess(): Promise<void> {
    try {
      await GoogleSignin.revokeAccess()
    } catch (error: any) {
      throw new Error(`Lỗi thu hồi quyền truy cập: ${error.message}`)
    }
  }

  async getTokens(): Promise<{ idToken: string; accessToken: string }> {
    try {
      return await GoogleSignin.getTokens()
    } catch (error: any) {
      throw new Error(`Lỗi lấy tokens: ${error.message}`)
    }
  }
}

export const googleSignInService = new GoogleSignInService()
export default googleSignInService
