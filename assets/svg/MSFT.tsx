import * as React from "react"
import Svg, { Path, G, Defs, ClipPath, Rect } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const MSFT = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 40 40" fill="none" {...props}>
    <Path
      d="M0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20Z"
      fill={props.fill ?? 'white'} 
     fillOpacity={1}/>
    <G clipPath="url(#clip0_635_9662)">
      <Path d="M19.5466 19.5463H10.8335V10.8333H19.5466V19.5463Z" fill={props.fill ?? '#F1511B'}   fillOpacity={1}/>
      <Path d="M29.1666 19.5463H20.4536V10.8333H29.1666V19.5463Z" fill={props.fill ?? '#80CC28'}   fillOpacity={1}/>
      <Path d="M19.5463 29.1667H10.8335V20.4536H19.5463V29.1667Z" fill={props.fill ?? '#00ADEF'}   fillOpacity={1}/>
      <Path d="M29.1666 29.1667H20.4536V20.4536H29.1666V29.1667Z" fill={props.fill ?? '#FBBC09'}   fillOpacity={1}/>
    </G>
    <Defs>
      <ClipPath id="clip0_635_9662">
        <Rect
          width={18.3333}
          height={18.3333}
          fill={props.fill ?? 'white'} 
          transform="translate(10.8335 10.8333)"
         fillOpacity={1}/>
      </ClipPath>
    </Defs>
  </Svg>
)
export default MSFT
