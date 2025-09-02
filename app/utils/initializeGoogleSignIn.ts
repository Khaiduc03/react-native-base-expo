import { googleSignInService } from "@/services/googleSignIn"

/**
 * Khởi tạo Google Sign-In service
 * Gọi function này trong App.tsx hoặc index.tsx
 */
export const initializeGoogleSignIn = () => {
  try {
    googleSignInService.configure()
    console.log("Google Sign-In đã được khởi tạo thành công")
  } catch (error) {
    console.error("Lỗi khởi tạo Google Sign-In:", error)
  }
}

export default initializeGoogleSignIn
