import { FC, useState } from "react"
import { ViewStyle, View, Alert, StyleSheet } from "react-native"
import type { AppStackScreenProps } from "@/navigators/AppNavigator"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { GoogleSignInButton } from "@/components/GoogleSignInButton"
import { useGoogleAuth } from "@/utils/useGoogleAuth"
import { colors } from "@/theme/colors"

interface LoginScreenProps extends AppStackScreenProps<"LoginScreen"> {}

export const LoginScreen: FC<LoginScreenProps> = () => {
  const { signIn, isLoading, user } = useGoogleAuth()
  const [error, setError] = useState<string | null>(null)

  const handleGoogleSignIn = async () => {
    try {
      setError(null)
      const userInfo = await signIn()
      console.log("Đăng nhập thành công:", userInfo.user.name)

      // TODO: Xử lý logic sau khi đăng nhập thành công
      // Ví dụ: Lưu token, chuyển màn hình, v.v.
    } catch (error: any) {
      setError(error.message)
      Alert.alert("Lỗi đăng nhập", error.message)
    }
  }

  return (
    <Screen style={$root} preset="scroll">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Chào mừng bạn</Text>
          <Text style={styles.subtitle}>Đăng nhập để tiếp tục</Text>
        </View>

        <View style={styles.form}>
          <GoogleSignInButton
            onPress={handleGoogleSignIn}
            isLoading={isLoading}
            title="Đăng nhập với Google"
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          {user && (
            <View style={styles.userInfo}>
              <Text style={styles.userInfoTitle}>Thông tin người dùng:</Text>
              <Text>Email: {user.user.email}</Text>
              <Text>Tên: {user.user.name}</Text>
            </View>
          )}
        </View>
      </View>
    </Screen>
  )
}

const $root: ViewStyle = {
  flex: 1,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textDim,
    textAlign: "center",
  },
  form: {
    gap: 20,
  },
  errorText: {
    color: colors.error,
    textAlign: "center",
    fontSize: 14,
  },
  userInfo: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  userInfoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: colors.text,
  },
})
