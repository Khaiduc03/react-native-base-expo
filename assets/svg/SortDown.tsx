import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SortDown = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 10 16" fill="none" {...props}>
    <G clipPath="url(#clip0_3772_2397)">
      <Path
        d="M5.70868 5.09302C5.31806 4.70239 4.68368 4.70239 4.29306 5.09302L0.293056 9.09302C0.00555557 9.38052 -0.0788194 9.80864 0.0774306 10.1836C0.233681 10.5586 0.596181 10.8024 1.00243 10.8024H9.00243C9.40556 10.8024 9.77118 10.5586 9.92743 10.1836C10.0837 9.80864 9.99618 9.38052 9.71181 9.09302L5.71181 5.09302H5.70868Z"
        fill={props.fill ?? '#28AF37'} 
       fillOpacity={1}/>
    </G>
    <Defs>
      <ClipPath id="clip0_3772_2397">
        <Rect width={10} height={16} fill={props.fill ?? 'white'}   fillOpacity={1}/>
      </ClipPath>
    </Defs>
  </Svg>
)
export default SortDown
