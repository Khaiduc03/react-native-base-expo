import { ReactNode, forwardRef, ForwardedRef } from "react"
// eslint-disable-next-line no-restricted-imports
import { StyleProp, Text as RNText, TextProps as RNTextProps, TextStyle } from "react-native"
import { TOptions } from "i18next"

import { isRTL, TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle, ThemedStyleArray } from "@/theme/types"
import { typography } from "@/theme/typography"

type Sizes = keyof typeof $sizeStyles
type Weights = keyof typeof typography.primary
type Presets = "default" | "bold" | "heading" | "subheading" | "formLabel" | "formHelper"

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: TOptions
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>
  /**
   * One of the different types of text presets.
   */
  preset?: Presets
  /**
   * Text weight modifier.
   */
  weight?: Weights
  /**
   * Text size modifier.
   */
  size?: Sizes
  /**
   * Children components.
   */
  children?: ReactNode
  color?: string
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 * @see [Documentation and Examples]{@link https://docs.infinite.red/ignite-cli/boilerplate/app/components/Text/}
 * @param {TextProps} props - The props for the `Text` component.
 * @returns {JSX.Element} The rendered `Text` component.
 */
export const Text = forwardRef(function Text(props: TextProps, ref: ForwardedRef<RNText>) {
  const {
    weight,
    size,
    tx,
    txOptions,
    text,
    children,
    color,
    style: $styleOverride,
    ...rest
  } = props
  const { themed } = useAppTheme()

  const i18nText = tx && translate(tx, txOptions)
  const content = i18nText || text || children

  const preset: Presets = props.preset ?? "default"
  const $styles: StyleProp<TextStyle> = [
    $rtlStyle,

    themed($presets[preset]),
    color && { color },
    weight && $fontWeightStyles[weight],
    size && $sizeStyles[size],
    color && { color },
    $styleOverride,
  ]

  return (
    <RNText {...rest} style={$styles} ref={ref}>
      {content}
    </RNText>
  )
})

export const $sizeStyles = {
  // Existing scale
  "xxl": { fontSize: 36, lineHeight: 44 } satisfies TextStyle,
  "xl": { fontSize: 24, lineHeight: 34 } satisfies TextStyle,
  "lg": { fontSize: 20, lineHeight: 32 } satisfies TextStyle,
  "md": { fontSize: 18, lineHeight: 26 } satisfies TextStyle,
  "sm": { fontSize: 16, lineHeight: 24 } satisfies TextStyle,
  "xs": { fontSize: 14, lineHeight: 21 } satisfies TextStyle,
  "xxs": { fontSize: 13, lineHeight: 19.5 } satisfies TextStyle,

  // Added typography variants - style of deepsinverst
  "heading-h1": { fontSize: 48, lineHeight: 57.6 } satisfies TextStyle,
  "heading-h2": {
    fontSize: 32,
    lineHeight: 38.4,
    fontFamily: typography.primary.semiBold,
  } satisfies TextStyle,
  "heading-h3": { fontSize: 26, lineHeight: 28.8 } satisfies TextStyle,
  "heading-h4": { fontSize: 22, lineHeight: 24 } satisfies TextStyle,

  "title-1": {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: typography.primary.normal,
  } satisfies TextStyle,
  "title-2": { fontSize: 14, lineHeight: 17.5 } satisfies TextStyle,
  "title-3": { fontSize: 12, lineHeight: 15 } satisfies TextStyle,

  "button-1": { fontSize: 16, lineHeight: 19.2 } satisfies TextStyle,
  "button-2": { fontSize: 14, lineHeight: 16.8 } satisfies TextStyle,
  "button-3": { fontSize: 12, lineHeight: 14.4 } satisfies TextStyle,
  "button-4": { fontSize: 10, lineHeight: 12 } satisfies TextStyle,

  "body-1": { fontSize: 16, lineHeight: 22.4 } satisfies TextStyle,
  "body-2": { fontSize: 14, lineHeight: 19.6 } satisfies TextStyle,
  "body-3": { fontSize: 12, lineHeight: 16.8 } satisfies TextStyle,
}

const $fontWeightStyles = Object.entries(typography.primary).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } }
}, {}) as Record<Weights, TextStyle>

const $baseStyle: ThemedStyle<TextStyle> = (theme) => ({
  ...$sizeStyles.sm,
  ...$fontWeightStyles.normal,
  color: theme.colors.text,
})

const $presets: Record<Presets, ThemedStyleArray<TextStyle>> = {
  default: [$baseStyle],
  bold: [$baseStyle, { ...$fontWeightStyles.bold }],
  heading: [
    $baseStyle,
    {
      ...$sizeStyles.xxl,
      ...$fontWeightStyles.bold,
    },
  ],
  subheading: [$baseStyle, { ...$sizeStyles.lg, ...$fontWeightStyles.medium }],
  formLabel: [$baseStyle, { ...$fontWeightStyles.medium }],
  formHelper: [$baseStyle, { ...$sizeStyles.sm, ...$fontWeightStyles.normal }],
}
const $rtlStyle: TextStyle = isRTL ? { writingDirection: "rtl" } : {}
