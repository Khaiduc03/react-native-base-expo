# ImageLocal Components

Bộ components để hiển thị images, icons và SVG trong ứng dụng React Native.

## Components Available

### 1. Icon Components (PNG Icons)

- `Icon` - Hiển thị icon không có tương tác
- `PressableIcon` - Hiển thị icon có thể nhấn

### 2. Image Components (PNG Images)

- `ImageLocal` - Hiển thị image không có tương tác
- `PressableImage` - Hiển thị image có thể nhấn

### 3. SVG Components

- `Svg` - Hiển thị SVG không có tương tác
- `PressableSvg` - Hiển thị SVG có thể nhấn

## Usage Examples

### Icons (PNG)

```tsx
import { Icon, PressableIcon } from "@/components"

// Static icon
<Icon icon="back" size={24} color="#000" />

// Pressable icon
<PressableIcon
  icon="settings"
  size={32}
  color="#007AFF"
  onPress={() => console.log('Settings pressed')}
/>
```

### Images (PNG)

```tsx
import { ImageLocal, PressableImage } from "@/components"

// Static image
<ImageLocal image="logo" size={100} />

// Pressable image
<PressableImage
  image="welcomeFace"
  size={200}
  onPress={() => console.log('Image pressed')}
/>
```

### SVG

```tsx
import { Svg, PressableSvg } from "@/components"

// Static SVG
<Svg svg="Home" size={24} color="#000" />

// Pressable SVG
<PressableSvg
  svg="Settings"
  size={32}
  color="#007AFF"
  onPress={() => console.log('SVG pressed')}
/>
```

## Props

### Common Props (cho tất cả components)

- `color?: string` - Màu sắc cho icon/image/SVG
- `size?: number` - Kích thước (width = height)
- `style?: StyleProp<ImageStyle>` - Style override cho image/icon
- `containerStyle?: StyleProp<ViewStyle>` - Style override cho container

### Specific Props

- `icon: IconTypes` - Tên icon (cho Icon components)
- `image: ImagesKeyTypes` - Tên image (cho Image components)
- `svg: ISvgType` - Tên SVG (cho SVG components)

### Pressable Props

Các Pressable components còn nhận thêm tất cả props của `TouchableOpacity`:

- `onPress?: () => void`
- `onPressIn?: () => void`
- `onPressOut?: () => void`
- `disabled?: boolean`
- `activeOpacity?: number`
- ...và các props khác

## Available Assets

### Icons

- `back`, `bell`, `caretLeft`, `caretRight`, `check`, `hidden`, `ladybug`, `lock`, `menu`, `more`, `settings`, `view`, `x`

### Images

- `appIconAll`, `appIconAndroidAdaptiveBackground`, `appIconAndroidAdaptiveForeground`, `appIconAndroidLegacy`, `appIconIos`, `appIconWebFavicon`, `logo`, `sadFace`, `splashLogoAll`, `splashLogoAndroidUniversal`, `splashLogoIosMobile`, `splashLogoIosTablet`, `splashLogoWeb`, `welcomeFace`

### SVG

- `AAPL`, `AIChat`, `Account`, `Ai`, `Analysi`, `Analysis`, `ArrowRightTop`, `BTCUSD`, `Back`, `ETHUSD`, `EyeActive`, `EyeInactive`, `GoogleIcon`, `Guru`, `History`, `Home`, `HomeInactive`, `Humburger`, `Line`, `Lock`, `Lockup`, `Look`, `MSFT`, `Mail`, `NVDA`, `PieChart`, `Quote`, `Ring`, `Send`, `SortDown`, `SortUp`, `TSLA`, `WatchList`, `Wave`, `WayButton`, `X`

## Notes

- Icons và Images sử dụng `tintColor` để thay đổi màu sắc
- SVG sử dụng prop `fill` để thay đổi màu sắc
- Tất cả components đều có `resizeMode: "contain"` mặc định
- Khi không chỉ định `size`, component sẽ sử dụng kích thước gốc của asset
