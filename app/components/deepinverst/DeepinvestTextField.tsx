import React, { useMemo, useState, forwardRef, ForwardedRef } from "react"
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import LinearGradient from "@/components/LinearGradient"
import { Text } from "@/components/Text"
import SvgIcon from "@/components/SvgIcon"
import { useAppTheme } from "@/theme/context"
import type { ISvgType } from "@assets/svg"

export type TextFieldSize = "lg" | "md" | "sm" | "xs"
export type TextFieldStatus = "default" | "success" | "warning" | "danger" | "info"

export interface AccessoryProps {
  style?: StyleProp<ViewStyle>
}

export interface DeepinvestTextFieldProps extends Omit<TextInputProps, "style" | "onChange"> {
  label?: string
  required?: boolean
  size?: TextFieldSize
  status?: TextFieldStatus
  subText?: string
  containerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  LeftAccessory?: React.ComponentType<AccessoryProps>
  RightAccessory?: React.ComponentType<AccessoryProps>
  leftIcon?: ISvgType
  rightIcon?: ISvgType
  onLeftPress?: () => void
  onRightPress?: () => void
  disabled?: boolean
  labelColor?: string
  labelStyle?: StyleProp<TextStyle>
  fillColor?: string
}
export const DeepinvestTextField = forwardRef<TextInput, DeepinvestTextFieldProps>((props, ref) => {
  const {
    label,
    required,
    size = "md",
    status = "default",
    subText,
    containerStyle,
    inputStyle,
    LeftAccessory,
    RightAccessory,
    leftIcon,
    rightIcon,
    onLeftPress,
    onRightPress,
    disabled,
    secureTextEntry,
    labelColor,
    labelStyle,
    fillColor,
    ...textInputProps
  } = props

  const { theme } = useAppTheme()
  const { colors, spacing, typography } = theme

  const [focused, setFocused] = useState(false)

  const dims = useMemo(() => getSizeDimensions(size), [size])

  function getBorderColor(): string {
    if (disabled) return colors.border
    if (status === "danger") return colors.error as string
    if (focused) return "#FFFFFF"
    switch (status) {
      case "success":
        return colors.primary as string
      case "warning":
        return colors.palette.accent500 as string
      case "info":
        return colors.palette.secondary400 as string
      case "default":
        return colors.border as string
      default:
        return colors.border as string
    }
  }

  // function getBackgroundColor(): string {
  //   if (disabled) return colors.palette.neutral800;
  //   if (focused) return colors.palette.neutral700;
  //   return colors.palette.neutral800;
  // }

  function getShadowColor(): string {
    switch (status) {
      case "danger":
        return colors.error as string
      case "success":
        return colors.primary as string
      case "warning":
        return colors.palette.accent500 as string
      case "info":
        return colors.palette.secondary400 as string
      default:
        return colors.primary as string
    }
  }

  function getSubTextColor(): string | undefined {
    switch (status) {
      case "danger":
        return colors.error as string
      case "success":
        return colors.primary as string
      case "warning":
        return colors.palette.accent500 as string
      case "info":
        return colors.palette.secondary400 as string
      default:
        return undefined
    }
  }

  function getValueColor(): string {
    if (disabled) return colors.textDim as string
    if (status === "danger") return colors.error as string
    if (focused) return colors.text as string
    switch (status) {
      case "success":
        return colors.primary as string
      case "warning":
        return colors.palette.accent500 as string
      case "info":
        return colors.palette.secondary400 as string
      case "default":
      default:
        return colors.text as string
    }
  }

  const isMultiline = !!textInputProps.multiline
  const lineHeight = Math.round(dims.fontSize * 1.25)
  const maxLines = 5 // cap at 7 lines
  const maxHeight = lineHeight * maxLines + 16 // + paddingVertical

  return (
    <View style={containerStyle}>
      {!!label && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 6,
            gap: 5,
          }}
        >
          <Text
            size="title-2"
            weight="medium"
            color={(getSubTextColor() ?? colors.textDim) as string}
            style={labelStyle}
          >
            {label}
          </Text>
          {required && (
            <Text size="title-2" weight="bold" color={colors.error as string}>
              *
            </Text>
          )}
        </View>
      )}

      {/* Wrap the entire input area with a Pressable to allow tapping anywhere to focus */}
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0.06)",
          "rgba(255, 255, 255, 0.05)",
          "rgba(255, 255, 255, 0.1)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: dims.radius,
        }}
      >
        <Pressable
          style={[
            {
              minHeight: dims.height,
              borderRadius: dims.radius,
              paddingHorizontal: dims.paddingHorizontal,
              backgroundColor: focused ? colors.palette.neutral700 : "transparent",
              borderWidth: 1,
              borderColor: getBorderColor(),
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              opacity: disabled ? 0.6 : 1,
              paddingVertical: 6,
            },
            focused && {
              shadowColor: getShadowColor(),
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.8,
              shadowRadius: 6,
              elevation: 8,
            },
          ]}
          pointerEvents={disabled ? "none" : "auto"}
        >
          {!!LeftAccessory && <LeftAccessory style={{ marginRight: 4 }} />}
          {!!leftIcon && (
            <Pressable onPress={() => onLeftPress && onLeftPress()}>
              <SvgIcon name={leftIcon} size={20} fill={getValueColor() ?? "#fff"} />
            </Pressable>
          )}
          <TextInput
            ref={ref}
            placeholderTextColor={colors.textDim as string}
            style={[
              {
                flex: 1,
                color: (getValueColor() ?? colors.text) as string,
                fontFamily: typography.primary.normal,
                fontSize: dims.fontSize,
                lineHeight: lineHeight,
                paddingVertical: 8,
                maxHeight: isMultiline ? maxHeight : undefined,
                textAlignVertical: isMultiline ? "top" : "auto",
              },
              inputStyle,
            ]}
            onFocus={() => setFocused(true)}
            editable={!disabled}
            secureTextEntry={secureTextEntry}
            {...textInputProps}
            scrollEnabled={isMultiline ? true : (textInputProps.scrollEnabled as any)}
            onBlur={() => setFocused(false)}
          />
          {!!rightIcon && (
            <Pressable onPress={onRightPress} hitSlop={8} disabled={!onRightPress}>
              <SvgIcon name={rightIcon} size={20} fill={fillColor ?? "#fff"} />
            </Pressable>
          )}
          {!!RightAccessory && <RightAccessory style={{ marginLeft: 4 }} />}
        </Pressable>
      </LinearGradient>

      {!!subText && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginTop: 6,
          }}
        >
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 6,
              backgroundColor: getSubTextColor() ?? colors.textDim,
            }}
          />
          <Text size="title-2" color={(getSubTextColor() ?? colors.textDim) as string}>
            {subText}
          </Text>
        </View>
      )}
    </View>
  )
})

// --- helpers ---

type SizeDims = {
  height: number
  paddingHorizontal: number
  radius: number
  fontSize: number
}

const SIZE_DIMENSIONS: Record<TextFieldSize, SizeDims> = {
  lg: { height: 48, paddingHorizontal: 16, radius: 999, fontSize: 16 },
  md: { height: 40, paddingHorizontal: 14, radius: 999, fontSize: 14 },
  sm: { height: 36, paddingHorizontal: 12, radius: 999, fontSize: 13 },
  xs: { height: 32, paddingHorizontal: 10, radius: 999, fontSize: 12 },
}

function getSizeDimensions(size: TextFieldSize): SizeDims {
  return SIZE_DIMENSIONS[size] ?? SIZE_DIMENSIONS.md
}

export default DeepinvestTextField
