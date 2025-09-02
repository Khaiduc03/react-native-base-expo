const palette = {
  neutral100: "#F0F0F0",
  neutral200: "#D9D9D9",
  neutral300: "#BFBFBF",
  neutral400: "#8C8C8C",
  neutral500: "#595959",
  neutral600: "rgba(67, 67, 67, 1)",
  neutral700: "#262626",
  neutral800: "#1F1F1F",
  neutral900: "#141414",
  primary100: "#BCE6CE",
  primary200: "#9CDAB6",
  primary300: "#6EC994",
  primary400: "rgba(82, 190, 128, 1)",
  primary500: "#27AE60",
  primary600: "#239E57",
  primary700: "#1C7C44",
  primary800: "#156035",
  primary900: "#104928",
  secondary100: "#DCDDE9",
  secondary200: "#BCC0D6",
  secondary300: "#9196B9",
  secondary400: "#626894",
  secondary500: "#41476E",
  accent100: "#FFEED4",
  accent200: "#FFE1B2",
  accent300: "#FDD495",
  accent400: "#FBC878",
  accent500: "#FFBB50",
  angry100: "#FBE6E6",
  angry500: "#D50000",
  overlay20: "rgba(25, 16, 21, 0.2)",
  overlay50: "rgba(25, 16, 21, 0.5)",

  m3white: "#FFFFFF",
} as const

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: "rgba(0, 0, 0, 0)",
  /**
   * The default text color in many components.
   */
  text: "#FFFFFF",

  textBlur: "rgba(255, 255, 255, 0.75)",
  /**
   * Secondary text information.
   */
  textDim: "rgba(255, 255, 255, 0.6)",

  /**
   * The default color of the screen background.
   */
  background: "#070709",
  /**
   * The default border color.
   */
  border: "#BABABA54",
  /**
   * The main tinting color.
   */
  tint: palette.primary500,
  /**
   * The inactive tinting color.
   */
  tintInactive: palette.neutral300,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral300,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   */
  errorBackground: palette.angry100,
  primary: palette.primary500,
  white: "#fff",
} as const
