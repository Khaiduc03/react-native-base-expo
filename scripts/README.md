# Scripts

## Tạo Screen với Folder Tùy Chỉnh

Script `create-screen.js` cho phép bạn tạo screen mới với khả năng chỉ định thư mục đích.

### Cách sử dụng:

```bash
# Tạo screen trong thư mục mặc định (app/screens)
npm run create-screen <tên-screen>

# Tạo screen trong thư mục tùy chỉnh (app/screens/<folder>)
npm run create-screen <tên-screen> <folder>
```

### Ví dụ:

```bash
# Tạo LoginScreen trong app/screens/auth/
npm run create-screen LoginScreen auth

# Tạo HomeScreen trong app/screens/
npm run create-screen HomeScreen

# Tạo ProfileScreen trong app/screens/user/
npm run create-screen ProfileScreen user

# Tạo SettingsScreen trong app/screens/settings/
npm run create-screen SettingsScreen settings
```

### Tính năng:

- ✅ Tự động tạo thư mục nếu chưa tồn tại
- ✅ Tự động cập nhật navigation với tên đầy đủ (bao gồm "Screen")
- ✅ Hỗ trợ tên screen với PascalCase
- ✅ Tạo file TypeScript với đầy đủ type definitions
- ✅ Tích hợp sẵn với Ignite CLI

### Cấu trúc thư mục được tạo:

```
app/screens/
├── auth/
│   ├── LoginScreen.tsx
│   └── RegisterScreen.tsx
├── user/
│   ├── ProfileScreen.tsx
│   └── SettingsScreen.tsx
├── ErrorScreen/
└── WelcomeScreen.tsx
```

### Lưu ý:

- Tên screen nên sử dụng PascalCase (ví dụ: `LoginScreen`, `UserProfileScreen`)
- Folder sẽ được tạo tự động nếu chưa tồn tại
- Script sẽ tự động cập nhật navigation trong `AppNavigator.tsx`
