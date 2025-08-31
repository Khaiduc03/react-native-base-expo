import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const Send = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M13.3597 1.54888C14.0371 1.31221 14.6877 1.96288 14.4511 2.64021L10.5011 13.9269C10.2444 14.6589 9.22441 14.7002 8.90974 13.9915L7.00374 9.70355L9.68641 7.02021C9.77473 6.92543 9.82281 6.80007 9.82052 6.67053C9.81824 6.541 9.76576 6.41741 9.67415 6.3258C9.58255 6.23419 9.45896 6.18171 9.32942 6.17943C9.19989 6.17714 9.07452 6.22523 8.97974 6.31355L6.29641 8.99621L2.00841 7.09021C1.29974 6.77488 1.34174 5.75555 2.07307 5.49888L13.3597 1.54888Z"
      fill={props.fill ?? 'white'} 
     fillOpacity={1}/>
  </Svg>
)
export default Send
