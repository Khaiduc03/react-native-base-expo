import React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "./Text"
import { Button } from "./Button"
import { useGoogleAuth } from "@/utils/useGoogleAuth"
import { colors } from "@/theme/colors"

export const GoogleSignInTest: React.FC = () => {
  const { user, isLoading, isSignedIn, signIn, signOut, revokeAccess } = useGoogleAuth()

  const handleSignIn = async () => {
    try {
      const userInfo = await signIn()
      console.log("Đăng nhập thành công:", userInfo)
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      console.log("Đăng xuất thành công")
    } catch (error: any) {
      console.error("Lỗi đăng xuất:", error)
    }
  }

  const handleRevokeAccess = async () => {
    try {
      await revokeAccess()
      console.log("Thu hồi quyền truy cập thành công")
    } catch (error: any) {
      console.error("Lỗi thu hồi quyền truy cập:", error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google Sign-In Test</Text>

      <View style={styles.status}>
        <Text style={styles.statusText}>
          Trạng thái: {isSignedIn ? "Đã đăng nhập" : "Chưa đăng nhập"}
        </Text>
        {isLoading && <Text style={styles.loadingText}>Đang xử lý...</Text>}
      </View>

      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userInfoTitle}>Thông tin người dùng:</Text>
          <Text>ID: {user.user.id}</Text>
          <Text>Tên: {user.user.name}</Text>
          <Text>Email: {user.user.email}</Text>
          <Text>Given Name: {user.user.givenName}</Text>
          <Text>Family Name: {user.user.familyName}</Text>
          {user.user.photo && <Text>Photo: {user.user.photo}</Text>}
        </View>
      )}

      <View style={styles.buttons}>
        {!isSignedIn ? (
          <Button
            text="Đăng nhập với Google"
            onPress={handleSignIn}
            disabled={isLoading}
            style={styles.button}
          />
        ) : (
          <>
            <Button
              text="Đăng xuất"
              onPress={handleSignOut}
              disabled={isLoading}
              style={styles.button}
            />
            <Button
              text="Thu hồi quyền truy cập"
              onPress={handleRevokeAccess}
              disabled={isLoading}
              style={styles.button}
            />
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: colors.text,
  },
  status: {
    marginBottom: 20,
    alignItems: "center",
  },
  statusText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 5,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textDim,
  },
  userInfo: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.text,
  },
  buttons: {
    gap: 10,
  },
  button: {
    marginBottom: 10,
  },
})
