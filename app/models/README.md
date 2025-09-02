# MobX State Tree Setup

Dự án này đã được setup với MobX State Tree theo cấu trúc chuyên nghiệp với các tính năng:

## 🏗️ Cấu trúc Setup

### 1. **RootStore** (`RootStore.ts`)

- Quản lý tất cả stores trong ứng dụng
- Tự động tạo instance với `RootStoreModel.create({})`

### 2. **Helpers** (`helpers/`)

- **`useStores.ts`** - React hooks để truy cập stores
- **`setupRootStore.ts`** - Setup và persistence với AsyncStorage
- **`getRootStore.ts`** - Utility để truy cập root store từ bất kỳ store nào
- **`withSetPropAction.ts`** - Helper để tạo setter actions type-safe
- **`withSetVolatileAction.ts`** - Helper cho volatile properties

### 3. **Stores**

- **`AuthStore.ts`** - Quản lý authentication
- **`UserStore.ts`** - Quản lý user profile và preferences

## 🚀 Cách sử dụng

### 1. **Setup đã được tích hợp trong `app.tsx`**

```tsx
// app.tsx đã có sẵn
const { rehydrated } = useInitialRootStore(() => {
  console.log("rehydrated")
})
```

### 2. **Sử dụng stores trong components**

```tsx
import { observer } from "mobx-react"
import { useStores } from "../models"

export const MyComponent = observer(() => {
  const { authStore, userStore } = useStores()

  const handleSignIn = () => {
    authStore.signIn("email@example.com", "password")
  }

  return (
    <View>
      <Text>Is Authenticated: {authStore.isAuthenticated ? "Yes" : "No"}</Text>
      <Button onPress={handleSignIn} title="Sign In" />
    </View>
  )
})
```

### 3. **Truy cập từ store khác**

```tsx
import { getRootStore } from "../models/helpers/getRootStore"

// Trong một store action
const rootStore = getRootStore(self)
const authStore = rootStore.authStore
```

## ✨ Tính năng chính

### **Type Safety**

- Tất cả stores đều có TypeScript interfaces
- `withSetPropAction` cho type-safe setters
- Instance và SnapshotOut types

### **Persistence**

- Tự động lưu state vào AsyncStorage
- Rehydration khi app khởi động
- Configurable whitelist/blacklist cho từng store

### **Async Actions**

- Sử dụng `flow` generators cho async operations
- Built-in error handling
- Loading states quản lý tự động

### **Observer Pattern**

- Tự động re-render khi state thay đổi
- Computed values với `views`
- Reactive programming

## 📝 Ví dụ tạo Store mới

```tsx
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const MyStoreModel = types
  .model("MyStore")
  .props({
    data: types.optional(types.array(types.string), []),
    isLoading: types.optional(types.boolean, false),
  })
  .views((self) => ({
    get dataCount() {
      return self.data.length
    },
  }))
  .actions(withSetPropAction)
  .actions((self) => ({
    fetchData: flow(function* () {
      self.setProp("isLoading", true)
      try {
        // API call
        const result = yield api.getData()
        self.setProp("data", result)
      } catch (error) {
        console.error(error)
      } finally {
        self.setProp("isLoading", false)
      }
    }),
  }))

export interface MyStore extends Instance<typeof MyStoreModel> {}
export interface MyStoreSnapshot extends SnapshotOut<typeof MyStoreModel> {}
```

## 🔧 Configuration

### **Persistence Config** (`setupRootStore.ts`)

```tsx
const persistorConfig: RootStorePersistor = {
  authStore: {
    version: 1,
    whitelist: ["user", "isAuthenticated"], // Chỉ lưu các fields này
  },
  userStore: {
    version: 1,
    blacklist: ["isLoading"], // Không lưu loading state
  },
}
```

## 🎯 Best Practices

1. **Luôn wrap components với `observer`**
2. **Sử dụng `withSetPropAction` cho simple setters**
3. **Sử dụng `flow` cho async actions**
4. **Tạo computed values với `views`**
5. **Sử dụng TypeScript interfaces**

## 📚 Ví dụ sử dụng

Xem file `MobXExample.tsx` để có ví dụ đầy đủ về cách sử dụng các stores.
