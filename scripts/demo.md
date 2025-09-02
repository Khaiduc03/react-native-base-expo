# Demo: Tạo Screen với Folder Tùy Chỉnh

## Ví dụ thực tế

### 1. Tạo LoginScreen trong thư mục auth

```bash
npm run create-screen LoginScreen auth
```

Kết quả:

- ✅ Tạo thư mục: `app/screens/auth/` (nếu chưa tồn tại)
- ✅ Tạo file: `app/screens/auth/LoginScreen.tsx`
- ✅ Cập nhật navigation trong `AppNavigator.tsx`

### 2. Tạo HomeScreen trong thư mục mặc định

```bash
npm run create-screen HomeScreen
```

Kết quả:

- ✅ Tạo file: `app/screens/HomeScreen.tsx`
- ✅ Cập nhật navigation trong `AppNavigator.tsx`

### 3. Tạo ProfileScreen trong thư mục user

```bash
npm run create-screen ProfileScreen user
```

Kết quả:

- ✅ Tạo thư mục: `app/screens/user/` (nếu chưa tồn tại)
- ✅ Tạo file: `app/screens/user/ProfileScreen.tsx`
- ✅ Cập nhật navigation trong `AppNavigator.tsx`

## Cấu trúc thư mục sau khi tạo

```
app/screens/
├── auth/
│   ├── LoginScreen.tsx
│   └── RegisterScreen.tsx
├── user/
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
├── ErrorScreen/
├── HomeScreen.tsx
└── WelcomeScreen.tsx
```

## Navigation được cập nhật tự động

File `app/navigators/AppNavigator.tsx` sẽ được cập nhật với tên đầy đủ (bao gồm "Screen"):

```typescript
export type AppStackParamList = {
  Welcome: undefined
  // 🔥 Your screens go here
  LoginScreen: undefined
  HomeScreen: undefined
  ProfileScreen: undefined
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
}
```

## Lợi ích

1. **Tổ chức code tốt hơn**: Các screen được nhóm theo chức năng
2. **Tự động tạo thư mục**: Không cần tạo thư mục thủ công
3. **Cập nhật navigation tự động**: Không cần thêm route thủ công
4. **TypeScript support**: Đầy đủ type definitions
5. **Tích hợp Ignite**: Sử dụng template chuẩn của Ignite
