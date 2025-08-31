import * as React from "react"
import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const Analysis = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      d="M2.66675 2.66675V12.6667C2.66675 12.8436 2.73699 13.0131 2.86201 13.1382C2.98703 13.2632 3.1566 13.3334 3.33341 13.3334H13.3334M5.33341 10.6667L7.00008 7.00008L9.00008 9.00008L11.5154 4.66675L13.3334 6.44475"
      stroke={props.fill ?? 'white'} 
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
     fillOpacity={1}/>
  </Svg>
)
export default Analysis
