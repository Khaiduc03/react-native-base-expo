import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo } from "react"
import { useMMKVString } from "react-native-mmkv"

export type AuthContextType = {
  isAuthenticated: boolean
  authToken?: string
  authEmail?: string
  setAuthToken: (token?: string) => void
  setAuthRefreshToken: (refreshToken?: string) => void
  setAuthEmail: (email: string) => void
  logout: () => void
  validationError: string
}

export const AuthContext = createContext<AuthContextType | null>(null)

export interface AuthProviderProps {}

export const AUTH_TOKEN_KEY = "AuthProvider.authToken"
export const AUTH_REFRESH_TOKEN_KEY = "AuthProvider.authRefreshToken"
export const AUTH_EMAIL_KEY = "AuthProvider.authEmail"

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({ children }) => {
  const [authToken, setAuthToken] = useMMKVString(AUTH_TOKEN_KEY)
  const [authRefreshToken, setAuthRefreshToken] = useMMKVString(AUTH_REFRESH_TOKEN_KEY)
  const [authEmail, setAuthEmail] = useMMKVString(AUTH_EMAIL_KEY)

  const logout = useCallback(() => {
    setAuthToken(undefined)
    setAuthEmail("")
    setAuthRefreshToken("")
    // NavigationService.replace('MainTab');
  }, [setAuthEmail, setAuthToken, setAuthRefreshToken])

  const login = useCallback(
    (userData: any) => {
      setAuthToken(userData.token)
      setAuthRefreshToken(userData.refreshToken)
      setAuthEmail(userData.email)
    },
    [setAuthToken, setAuthRefreshToken, setAuthEmail],
  )

  const validationError = useMemo(() => {
    if (!authEmail || authEmail.length === 0) return "can't be blank"
    if (authEmail.length < 6) return "must be at least 6 characters"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authEmail)) return "must be a valid email address"
    return ""
  }, [authEmail])

  const value = {
    isAuthenticated: !!authToken,
    authToken,
    authRefreshToken,
    authEmail,
    setAuthToken,
    setAuthRefreshToken,
    setAuthEmail,
    logout,
    validationError,
    login,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
