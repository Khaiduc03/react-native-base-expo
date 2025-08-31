import {
  Image,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from "react-native"

import { useAppTheme } from "@/theme/context"
import { iconRegistry, IconTypes } from "@assets/icons"
import { imageRegistry, ImagesKeyTypes } from "@assets/images"
import SvgType, { ISvgType } from "@assets/svg"

// Base props cho tất cả các loại image
type BaseImageProps = {
  /**
   * An optional tint color for the image/icon
   */
  color?: string

  /**
   * An optional size for the image/icon. If not provided, the image will be sized to the image's resolution.
   */
  size?: number

  /**
   * Style overrides for the image/icon
   */
  style?: StyleProp<ImageStyle>

  /**
   * Style overrides for the container
   */
  containerStyle?: StyleProp<ViewStyle>
}

// Props cho Icon (PNG icons)
type BaseIconProps = BaseImageProps & {
  /**
   * The name of the icon
   */
  icon: IconTypes
}

// Props cho Image (PNG images)
type BaseImageLocalProps = BaseImageProps & {
  /**
   * The name of the image
   */
  image: ImagesKeyTypes
}

// Props cho SVG
type BaseSvgProps = BaseImageProps & {
  /**
   * The name of the SVG
   */
  svg: ISvgType
}

// Pressable variants
type PressableIconProps = Omit<TouchableOpacityProps, "style"> & BaseIconProps
type PressableImageProps = Omit<TouchableOpacityProps, "style"> & BaseImageLocalProps
type PressableSvgProps = Omit<TouchableOpacityProps, "style"> & BaseSvgProps

// Non-pressable variants
type IconProps = Omit<ViewProps, "style"> & BaseIconProps
type ImageLocalProps = Omit<ViewProps, "style"> & BaseImageLocalProps
type SvgProps = Omit<ViewProps, "style"> & BaseSvgProps

/**
 * A component to render a registered icon (PNG).
 * It is wrapped in a <TouchableOpacity />
 * @param {PressableIconProps} props - The props for the `PressableIcon` component.
 * @returns {JSX.Element} The rendered `PressableIcon` component.
 */
export function PressableIcon(props: PressableIconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...pressableProps
  } = props

  const { theme } = useAppTheme()

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <TouchableOpacity {...pressableProps} style={$containerStyleOverride}>
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </TouchableOpacity>
  )
}

/**
 * A component to render a registered image (PNG).
 * It is wrapped in a <TouchableOpacity />
 * @param {PressableImageProps} props - The props for the `PressableImage` component.
 * @returns {JSX.Element} The rendered `PressableImage` component.
 */
export function PressableImage(props: PressableImageProps) {
  const {
    image,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...pressableProps
  } = props

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    color && { tintColor: color },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <TouchableOpacity {...pressableProps} style={$containerStyleOverride}>
      <Image style={$imageStyle} source={imageRegistry[image]} />
    </TouchableOpacity>
  )
}

/**
 * A component to render a registered SVG.
 * It is wrapped in a <TouchableOpacity />
 * @param {PressableSvgProps} props - The props for the `PressableSvg` component.
 * @returns {JSX.Element} The rendered `PressableSvg` component.
 */
export function PressableSvg(props: PressableSvgProps) {
  const {
    svg,
    color,
    size,
    style: $svgStyleOverride,
    containerStyle: $containerStyleOverride,
    ...pressableProps
  } = props

  const SvgComponent = SvgType[svg]

  const $svgStyle: StyleProp<ViewStyle> = [
    size !== undefined && { width: size, height: size },
    $svgStyleOverride,
  ]

  return (
    <TouchableOpacity {...pressableProps} style={$containerStyleOverride}>
      <View style={$svgStyle}>
        <SvgComponent fill={color} />
      </View>
    </TouchableOpacity>
  )
}

/**
 * A component to render a registered icon (PNG).
 * It is wrapped in a <View />, use `PressableIcon` if you want to react to input
 * @param {IconProps} props - The props for the `Icon` component.
 * @returns {JSX.Element} The rendered `Icon` component.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...viewProps
  } = props

  const { theme } = useAppTheme()

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    { tintColor: color ?? theme.colors.text },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <View {...viewProps} style={$containerStyleOverride}>
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </View>
  )
}

/**
 * A component to render a registered image (PNG).
 * It is wrapped in a <View />, use `PressableImage` if you want to react to input
 * @param {ImageLocalProps} props - The props for the `ImageLocal` component.
 * @returns {JSX.Element} The rendered `ImageLocal` component.
 */
export function ImageLocal(props: ImageLocalProps) {
  const {
    image,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...viewProps
  } = props

  const $imageStyle: StyleProp<ImageStyle> = [
    $imageStyleBase,
    color && { tintColor: color },
    size !== undefined && { width: size, height: size },
    $imageStyleOverride,
  ]

  return (
    <View {...viewProps} style={$containerStyleOverride}>
      <Image style={$imageStyle} source={imageRegistry[image]} />
    </View>
  )
}

/**
 * A component to render a registered SVG.
 * It is wrapped in a <View />, use `PressableSvg` if you want to react to input
 * @param {SvgProps} props - The props for the `Svg` component.
 * @returns {JSX.Element} The rendered `Svg` component.
 */
export function Svg(props: SvgProps) {
  const {
    svg,
    color,
    size,
    style: $svgStyleOverride,
    containerStyle: $containerStyleOverride,
    ...viewProps
  } = props

  const SvgComponent = SvgType[svg]

  const $svgStyle: StyleProp<ViewStyle> = [
    size !== undefined && { width: size, height: size },
    $svgStyleOverride,
  ]

  return (
    <View {...viewProps} style={$containerStyleOverride}>
      <View style={$svgStyle}>
        <SvgComponent fill={color} />
      </View>
    </View>
  )
}

const $imageStyleBase: ImageStyle = {
  resizeMode: "contain",
}
