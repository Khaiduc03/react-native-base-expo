import React from "react"
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native"
import { Text } from "./Text"
import { colors } from "@/theme/colors"

interface GoogleSignInButtonProps {
  onPress: () => void
  isLoading?: boolean
  disabled?: boolean
  title?: string
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onPress,
  isLoading = false,
  disabled = false,
  title = "Đăng nhập với Google",
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.text} />
        ) : (
          <Text style={styles.googleIcon}>G</Text>
        )}
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dadce0",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4285f4",
    marginRight: 12,
    width: 20,
    textAlign: "center",
  },
  text: {
    color: "#3c4043",
    fontSize: 16,
    fontWeight: "500",
  },
  disabled: {
    opacity: 0.6,
  },
})
