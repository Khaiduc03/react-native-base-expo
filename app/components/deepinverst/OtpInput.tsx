import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Pressable,
  StyleProp,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';

import {Text} from '@/components/Text';
import {useAppTheme} from '@/theme/context';

export type OtpSize = 'lg' | 'md' | 'sm';

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  autoFocus?: boolean;
  size?: OtpSize;
  secure?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  boxStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  gap?: number;
  error?: boolean;
  errorText?: string;
  messageStyle?: StyleProp<TextStyle>;
}

export function OtpInput(props: OtpInputProps) {
  const {
    length = 6,
    value,
    onChange,
    onComplete,
    autoFocus,
    size = 'md',
    secure,
    disabled,
    style,
    boxStyle,
    textStyle,
    gap = 12,
    error,
    errorText,
    messageStyle,
  } = props;

  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState('');
  const current = value ?? internal;

  const {theme} = useAppTheme();
  const colors = theme.colors;

  // Measure available row width to compute responsive item sizes
  const [rowWidth, setRowWidth] = useState<number | null>(null);
  const onRowLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w && w !== rowWidth) setRowWidth(w);
  };

  const dims = useMemo(() => {
    // Fallback defaults (previous fixed sizes) in case width not measured yet
    const defaults = (function () {
      switch (size) {
        case 'lg':
          return {w: 56, h: 72, r: 16, fs: 24};
        case 'sm':
          return {w: 40, h: 48, r: 10, fs: 18};
        case 'md':
        default:
          return {w: 48, h: 56, r: 12, fs: 20};
      }
    })();

    // If we have row width, compute responsive sizes
    if (rowWidth && rowWidth > 0) {
      const totalGaps = gap * (length - 1);
      const available = Math.max(0, rowWidth - totalGaps);
      const boxW = Math.floor(available / length);

      // Height ratio per size (approx from original sizes)
      const aspect = size === 'lg' ? 1.29 : size === 'sm' ? 1.2 : 1.17;
      const w = Math.max(28, boxW); // guard a sensible minimum
      const h = Math.round(w * aspect);
      const r = Math.round(w * 0.27);
      const fs = Math.max(16, Math.round(w * 0.42));
      return {w, h, r, fs};
    }

    return defaults;
  }, [rowWidth, gap, length, size]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const chars = useMemo(() => {
    const sanitized = (current || '').replace(/\D+/g, '').slice(0, length);
    return Array.from({length}).map((_, i) => sanitized[i] ?? '');
  }, [current, length]);

  function handleChangeText(txt: string) {
    const sanitized = txt.replace(/\D+/g, '').slice(0, length);
    if (value === undefined) setInternal(sanitized);
    onChange?.(sanitized);
    if (sanitized.length === length) onComplete?.(sanitized);
  }

  function handleKeyPress(e: any) {
    if (
      e.nativeEvent.key === 'Backspace' &&
      current.length > 0 &&
      value === undefined
    ) {
      setInternal(s => s.slice(0, -1));
    }
  }

  const activeIndex = Math.min(current.length, length - 1);

  return (
    <View style={style}>
      <Pressable
        onPress={() => inputRef.current?.focus()}
        disabled={disabled}
        style={[{flexDirection: 'row', gap}]}
        onLayout={onRowLayout}
      >
        {/* Hidden single input captures all typing */}
        <TextInput
          ref={inputRef}
          value={current}
          onChangeText={handleChangeText}
          onKeyPress={handleKeyPress}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={length}
          autoFocus={autoFocus}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          caretHidden
          style={{position: 'absolute', width: 1, height: 1, opacity: 0, color: colors.white}}
          editable={!disabled}
        />

        {chars.map((c, i) => {
          const isActive = focused && i === activeIndex;
          return (
            <View
              key={i}
              style={[
                {
                  width: dims.w,
                  height: dims.h,
                  borderRadius: dims.r,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderWidth: 2,
                  borderColor: error
                    ? colors.error
                    : isActive
                    ? colors.white
                    : colors.border,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                boxStyle,
              ]}>
              <Text
                style={[
                  {
                    fontSize: dims.fs,
                    lineHeight: Math.round(dims.fs * 1.25),
                    color: error ? colors.error : colors.text,
                  },
                  textStyle,
                ]}>
                {secure && c ? '•' : c}
              </Text>
            </View>
          );
        })}
      </Pressable>
      {!!(error && errorText) && (
        <Text style={[{marginTop: 8, color: colors.error}, messageStyle]}>{errorText}</Text>
      )}
    </View>
  );
}

export default OtpInput;
