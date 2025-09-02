declare module 'react-native-wagmi-charts' {
  import * as React from 'react';
  import {ViewProps} from 'react-native';

  export interface LineChartProviderProps {
    data: Array<{timestamp: number; value: number}>;
    children?: React.ReactNode;
  }

  export interface LineChartProps extends ViewProps {
    width?: number;
    height?: number;
    children?: React.ReactNode;
  }

  export interface LineChartPathProps {
    color?: string;
    strokeWidth?: number;
    children?: React.ReactNode;
  }

  export interface LineChartGradientProps {
    color?: string;
    fromOpacity?: number;
    toOpacity?: number;
  }

  type LineChartType = React.FC<LineChartProps> & {
    Provider: React.FC<LineChartProviderProps>;
    Path: React.FC<LineChartPathProps>;
    Gradient: React.FC<LineChartGradientProps>;
    CursorCrosshair?: React.FC<any>;
  };

  export const LineChart: LineChartType;
}
