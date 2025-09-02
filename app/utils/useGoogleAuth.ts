import { useState, useEffect, useCallback } from "react"
import { googleSignInService, GoogleUser } from "@/services/googleSignIn"

export const useGoogleAuth = () => {
  const [user, setUser] = useState<GoogleUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  const checkSignInStatus = useCallback(async () => {
    try {
      const signedIn = await googleSignInService.isSignedIn()
      setIsSignedIn(signedIn)

      if (signedIn) {
        const currentUser = await googleSignInService.getCurrentUser()
        setUser(currentUser)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Lỗi kiểm tra trạng thái đăng nhập:", error)
      setIsSignedIn(false)
      setUser(null)
    }
  }, [])

  const signIn = useCallback(async () => {
    setIsLoading(true)
    try {
      const userInfo = await googleSignInService.signIn()
      setUser(userInfo)
      setIsSignedIn(true)
      return userInfo
    } catch (error) {
      console.error("Lỗi đăng nhập:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    setIsLoading(true)
    try {
      await googleSignInService.signOut()
      setUser(null)
      setIsSignedIn(false)
    } catch (error) {
      console.error("Lỗi đăng xuất:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const revokeAccess = useCallback(async () => {
    setIsLoading(true)
    try {
      await googleSignInService.revokeAccess()
      setUser(null)
      setIsSignedIn(false)
    } catch (error) {
      console.error("Lỗi thu hồi quyền truy cập:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkSignInStatus()
  }, [checkSignInStatus])

  return {
    user,
    isLoading,
    isSignedIn,
    signIn,
    signOut,
    revokeAccess,
    checkSignInStatus,
  }
}
