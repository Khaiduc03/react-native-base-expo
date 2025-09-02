import React from 'react';
import {View, ViewStyle} from 'react-native';
import type {SvgProps} from 'react-native-svg';

// 1) Import mapping mà bạn đã export default trong src/assets/svg/index.ts
import Icons, {ISvgType as IconName} from '@assets/svg';

export interface SvgIconProps {
  /** Tên icon (key của object SvgType) */
  name: IconName;
  /** Kích thước chiều rộng & chiều cao (px) */
  size?: number;
  /** Màu fill hoặc stroke */
  fill?: string;
  /** Style thêm cho container */
  style?: ViewStyle;
  stroke?: string;
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
}

export type SvgIconPropsWithDefaults = SvgProps & {
  backgroundColor?: string;
};

/**
 * Một component chung để render SVG icon.
 */
const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  size = 24,
  fill,
  stroke,
  style,
  height,
  width,
  backgroundColor,
}) => {
  // 2) Lấy component tương ứng từ mapping
  const IconComponent = Icons[
    name
  ] as React.FC<SvgIconPropsWithDefaults> | null;

  if (!IconComponent) {
    // console.warn(
    //   `[SvgIcon] icon "${name}" không tồn tại trong SvgType mapping.`,
    // );
    // console.log('[SvgIcon] available icons:', Object.keys(Icons));
    return null;
  }

  // 3) Wrapper để ép kích thước và canh giữa
  return (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      fill={fill}
      stroke={stroke}
      color={fill}
      backgroundColor={backgroundColor}
    />
  );
};

export default SvgIcon;
