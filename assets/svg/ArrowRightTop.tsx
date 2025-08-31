import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const ArrowRightTop = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.97626 4.70017C4.97626 4.33199 5.27473 4.03351 5.64292 4.03351H11.2997C11.2997 4.03351 11.2998 4.03351 11.2999 4.03351H11.3096C11.6778 4.03351 11.9763 4.33199 11.9763 4.70017V10.3668C11.9763 10.735 11.6778 11.0335 11.3096 11.0335C10.9414 11.0335 10.6429 10.735 10.6429 10.3668V6.29984L5.17152 11.7712C4.91117 12.0316 4.48906 12.0316 4.22871 11.7712C3.96836 11.5109 3.96836 11.0888 4.22871 10.8284L9.6903 5.36684H5.64292C5.27473 5.36684 4.97626 5.06836 4.97626 4.70017Z"
      fill={props.fill ?? 'white'} 
     fillOpacity={1}/>
  </Svg>
)
export default ArrowRightTop
