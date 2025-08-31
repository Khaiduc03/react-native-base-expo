import * as React from "react"
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const SortUp = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 10 16" fill="none" {...props}>
    <G clipPath="url(#clip0_3961_3925)">
      <Path
        d="M4.29132 10.907C4.68194 11.2976 5.31632 11.2976 5.70694 10.907L9.70694 6.90698C9.99444 6.61948 10.0788 6.19136 9.92257 5.81636C9.76632 5.44136 9.40382 5.19761 8.99757 5.19761L0.997569 5.19761C0.594444 5.19761 0.228819 5.44136 0.0725689 5.81636C-0.0836811 6.19136 0.00381851 6.61948 0.288194 6.90698L4.28819 10.907H4.29132Z"
        fill={props.fill ?? '#E33C3F'} 
       fillOpacity={1}/>
    </G>
    <Defs>
      <ClipPath id="clip0_3961_3925">
        <Rect width={10} height={16} fill={props.fill ?? 'white'}  transform="matrix(-1 0 0 -1 10 16)"  fillOpacity={1}/>
      </ClipPath>
    </Defs>
  </Svg>
)
export default SortUp
