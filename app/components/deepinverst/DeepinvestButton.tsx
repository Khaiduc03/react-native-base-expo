import React, {ComponentType} from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import {useAppTheme} from '@/theme/context';
import type {ThemedStyle} from '@/theme/types';
import {Text} from '@/components/Text';
import LinearGradient from 'react-native-linear-gradient';
import {ISvgType} from '@assets/svg';
import SvgIcon from '../SvgIcon';

export type ButtonSize = 'lg' | 'md' | 'sm' | 'xs' | 'icon';
export type ButtonVariant = 'primary' | 'neutral';

export interface ButtonAccessoryProps {
  style: StyleProp<ViewStyle>;
  pressableState: PressableStateCallbackType;
  disabled?: boolean;
}

export interface DeepinvestButtonProps
  extends Omit<PressableProps, 'children'> {
  label?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  skeleton?: boolean;
  useGradient?: boolean;
  LeftAccessory?: ComponentType<ButtonAccessoryProps>;
  RightAccessory?: ComponentType<ButtonAccessoryProps>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  pressedTextStyle?: StyleProp<TextStyle>;
  pressedStyle?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  leftIcon?: ISvgType;
  rightIcon?: ISvgType;
  labelColor?: string;
}

export function DeepinvestButton(props: DeepinvestButtonProps) {
  const {
    label,
    size = 'md',
    variant = 'primary',
    loading,
    skeleton,
    LeftAccessory,
    RightAccessory,
    style: $viewStyleOverride,
    textStyle: $textStyleOverride,
    pressedTextStyle: $pressedTextStyleOverride,
    pressedStyle: $pressedViewStyleOverride,
    disabledStyle: $disabledViewStyleOverride,
    disabled,
    useGradient = true,
    leftIcon,
    rightIcon,
    labelColor,
    ...rest
  } = props;

  const {themed, theme} = useAppTheme();

  function $containerStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      themed(getBaseContainerStyle(size)),
      themed(getVariantContainerStyle(variant)),
      size === 'icon' && {borderWidth: 0},
      {paddingVertical: theme.spacing.sm},
      $viewStyleOverride,
      !!pressed &&
        themed([getPressedContainerStyle(variant), $pressedViewStyleOverride]),
      !!disabled && themed(getDisabledContainerStyle(variant)),
      !!disabled && $disabledViewStyleOverride,
    ];
  }

  function $labelStyle({
    pressed,
  }: PressableStateCallbackType): StyleProp<TextStyle> {
    return [
      themed(getBaseTextStyle(size)),
      themed(getVariantTextStyle(variant)),
      themed(getStateTextStyle(variant, pressed, !!disabled, !!loading)), // Convert to boolean

      labelColor ? {color: labelColor} : null,
      !!pressed && [$pressedTextStyleOverride],
      $textStyleOverride,
    ];
  }

  if (skeleton) {
    return (
      <View
        style={[
          themed(getBaseContainerStyle(size)),
          themed($skeletonStyle),
          $viewStyleOverride,
        ]}
      />
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{disabled: !!disabled}}
      disabled={disabled || loading}
      style={$containerStyle}
      {...rest}>
      {state => (
        <>
          {variant === 'primary' && useGradient && !disabled && (
            <LinearGradient
              pointerEvents="none"
              colors={['#27AE60', '#1C7C44']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={themed($gradientOverlay)}
            />
          )}
          {!!LeftAccessory && (
            <LeftAccessory
              style={[themed($accessoryLeftStyle(size))]}
              pressableState={state}
              disabled={!!disabled}
            />
          )}
          {!!leftIcon && <SvgIcon name={leftIcon} size={18} />}
          {loading ? (
            <View style={themed($loadingContent)}>
              {!!label && (
                <Text style={$labelStyle(state)} numberOfLines={1}>
                  {label}
                </Text>
              )}
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
                style={{marginLeft: 8}}
              />
            </View>
          ) : (
            !!label && (
              <Text
                style={[
                  {color: labelColor ? labelColor : '#fff'},
                  $labelStyle(state),
                ]}
                numberOfLines={1}>
                {label}
              </Text>
            )
          )}
          {!!rightIcon && <SvgIcon name={rightIcon} size={18} />}
          {!!RightAccessory && (
            <RightAccessory
              style={[themed($accessoryRightStyle(size))]}
              pressableState={state}
              disabled={!!disabled}
            />
          )}
        </>
      )}
    </Pressable>
  );
}

// Styles

const SIZE_DIMENSIONS: Record<
  ButtonSize,
  {
    height: number;
    paddingHorizontal: number;
    borderRadius: number;
    fontSize: number;
  }
> = {
  lg: {height: 40, paddingHorizontal: 24, borderRadius: 1000, fontSize: 14},
  md: {height: 40, paddingHorizontal: 14, borderRadius: 999, fontSize: 14},
  sm: {height: 32, paddingHorizontal: 12, borderRadius: 999, fontSize: 13},
  xs: {height: 28, paddingHorizontal: 10, borderRadius: 999, fontSize: 12},
  icon: {height: 36, paddingHorizontal: 8, borderRadius: 8, fontSize: 14},
};

const getBaseContainerStyle =
  (size: ButtonSize): ThemedStyle<ViewStyle> =>
  () => {
    const dim = SIZE_DIMENSIONS[size];
    return {
      minHeight: dim.height,
      paddingHorizontal: dim.paddingHorizontal,

      borderRadius: dim.borderRadius,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      minWidth: 100,
      overflow: 'hidden',
      position: 'relative',
      paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    };
  };

const getBaseTextStyle =
  (size: ButtonSize): ThemedStyle<TextStyle> =>
  ({typography}) => {
    const dim = SIZE_DIMENSIONS[size];
    return {
      fontSize: dim.fontSize,
      lineHeight: Math.round(dim.fontSize * 1.25),
      fontFamily: typography.primary.medium,
      textAlign: 'center',
    };
  };

const getVariantContainerStyle =
  (variant: ButtonVariant): ThemedStyle<ViewStyle> =>
  ({colors}) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: '#52BE80',
        };
      case 'neutral':
      default:
        return {backgroundColor: colors.palette.neutral800};
    }
  };

const $gradientOverlay: ThemedStyle<ViewStyle> = () => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: 1000,
});

const getVariantTextStyle =
  (variant: ButtonVariant): ThemedStyle<TextStyle> =>
  ({colors}) => {
    switch (variant) {
      case 'primary':
        return {color: '#FFFFFF'};
      case 'neutral':
      default:
        return {color: colors.text};
    }
  };

const getPressedContainerStyle =
  (variant: ButtonVariant): ThemedStyle<ViewStyle> =>
  ({colors}) => {
    switch (variant) {
      case 'primary':
        return {opacity: 0.6, backgroundColor: colors.primary};
      case 'neutral':
      default:
        return {opacity: 0.92, backgroundColor: colors.palette.neutral700};
    }
  };

const getDisabledContainerStyle =
  (variant: ButtonVariant): ThemedStyle<ViewStyle> =>
  ({colors}) => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: colors.palette.neutral600,
          borderColor: colors.palette.neutral500,
          opacity: 0.6,
        };
      case 'neutral':
      default:
        return {
          backgroundColor: colors.palette.neutral700,
          opacity: 0.5,
        };
    }
  };

const getStateTextStyle =
  (
    variant: ButtonVariant,
    pressed: boolean,
    disabled: boolean,
    loading: boolean,
  ): ThemedStyle<TextStyle> =>
  ({colors}) => {
    if (disabled) {
      return {
        color: colors.palette.neutral400,
        opacity: 0.7,
      }; // Disabled text color with reduced opacity
    }
    if (loading) {
      return {color: colors.palette.neutral300}; // Loading text color
    }
    if (pressed) {
      switch (variant) {
        case 'primary':
          return {color: colors.palette.neutral100}; // Pressed primary text
        case 'neutral':
        default:
          return {color: colors.palette.neutral200}; // Pressed neutral text
      }
    }
    return {}; // Default text color from variant
  };

const $accessoryLeftStyle =
  (size: ButtonSize): ThemedStyle<ViewStyle> =>
  () => ({marginRight: size === 'icon' ? 0 : 8});
const $accessoryRightStyle =
  (size: ButtonSize): ThemedStyle<ViewStyle> =>
  () => ({marginLeft: size === 'icon' ? 0 : 8});
const $loadingContent: ThemedStyle<ViewStyle> = () => ({
  flexDirection: 'row',
  alignItems: 'center',
});
const $skeletonStyle: ThemedStyle<ViewStyle> = ({colors}) => ({
  backgroundColor: colors.border,
  opacity: 0.6,
});

export default DeepinvestButton;
