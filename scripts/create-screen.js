#!/usr/bin/env node

const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

// Lấy tham số từ command line
const args = process.argv.slice(2)
const screenName = args[0]
const folder = args[1]

// Kiểm tra nếu có --help hoặc không có tên screen
if (args.includes("--help") || args.includes("-h") || !screenName || screenName.startsWith("-")) {
  console.log("📝 Cách sử dụng:")
  console.log("   npm run create-screen <tên-screen> [folder]")
  console.log("   hoặc")
  console.log("   node scripts/create-screen.js <tên-screen> [folder]")
  console.log("")
  console.log("📁 Ví dụ:")
  console.log("   npm run create-screen LoginScreen auth")
  console.log("   npm run create-screen HomeScreen")
  console.log("   npm run create-screen ProfileScreen user")
  console.log("")
  console.log("📋 Tham số:")
  console.log("   <tên-screen>  Tên screen (bắt buộc, sử dụng PascalCase)")
  console.log("   [folder]      Thư mục đích (tùy chọn, mặc định: app/screens)")
  process.exit(0)
}

try {
  // Tạo thư mục nếu chưa tồn tại
  if (folder) {
    const folderPath = path.join(__dirname, "..", "app", "screens", folder)
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
      console.log(`✅ Đã tạo thư mục: app/screens/${folder}`)
    }
  }

  // Tạo screen bằng Ignite CLI với folder tùy chỉnh
  let command = `npx ignite-cli generate screen ${screenName}`

  if (folder) {
    // Sử dụng option --dir để override đường dẫn
    command = `npx ignite-cli generate screen ${screenName} --dir app/screens/${folder}`
  }

  console.log(`🚀 Đang tạo screen: ${screenName}${folder ? ` trong thư mục: ${folder}` : ""}`)
  execSync(command, { stdio: "inherit" })

  // Cập nhật navigation để thêm chữ "Screen" vào tên và import
  const navigatorPath = path.join(__dirname, "..", "app", "navigators", "AppNavigator.tsx")
  if (fs.existsSync(navigatorPath)) {
    let navigatorContent = fs.readFileSync(navigatorPath, "utf8")

    // Lấy tên screen không có "Screen" ở cuối (như Ignite CLI đã tạo)
    const screenNameWithoutScreen = screenName.replace(/Screen$/, "")

    // Template đã tự động thêm navigation type đúng, không cần thay thế nữa

    // Thêm import statement
    const importStatement = `import { ${screenName} } from "@/screens${folder ? `/${folder}` : ""}/${screenName}"`
    const lastImportIndex = navigatorContent.lastIndexOf("import")
    const lastImportEndIndex = navigatorContent.indexOf("\n", lastImportIndex) + 1

    if (!navigatorContent.includes(importStatement)) {
      navigatorContent =
        navigatorContent.slice(0, lastImportEndIndex) +
        importStatement +
        "\n" +
        navigatorContent.slice(lastImportEndIndex)
    }

    // Thêm Stack.Screen component
    const stackScreenComponent = `      <Stack.Screen name="${screenName}" component={${screenName}} />`
    const anchorIndex = navigatorContent.indexOf("/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */")

    if (anchorIndex !== -1 && !navigatorContent.includes(`name="${screenName}"`)) {
      const beforeAnchor = navigatorContent.slice(0, anchorIndex)
      const afterAnchor = navigatorContent.slice(anchorIndex)
      navigatorContent = beforeAnchor + stackScreenComponent + "\n      " + afterAnchor
    }

    fs.writeFileSync(navigatorPath, navigatorContent)
    console.log(`✅ Đã thêm import và component cho ${screenName}`)
  }

  console.log(`✅ Đã tạo thành công screen: ${screenName}`)
  if (folder) {
    console.log(`📁 Vị trí: app/screens/${folder}/${screenName}.tsx`)
  } else {
    console.log(`📁 Vị trí: app/screens/${screenName}.tsx`)
  }
} catch (error) {
  console.error("❌ Lỗi khi tạo screen:", error.message)
  process.exit(1)
}
