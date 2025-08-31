import * as React from "react"
import Svg, { G, Path, Mask, Defs, ClipPath, Rect } from "react-native-svg"
import type { SvgProps } from "react-native-svg"
const Guru = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 41 40" fill="none" {...props}>
    <G clipPath="url(#clip0_2504_12193)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.6875 31.531V18.55H15.9375V31.531L19.6875 31.531Z"
        fill={props.fill ?? '#F4ADFF'} 
       fillOpacity={1}/>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.1875 16.6281V31.531L30.9375 31.531V16.6281H27.1875Z"
        fill={props.fill ?? '#F4ADFF'} 
       fillOpacity={1}/>
      <Mask
        id="mask0_2504_12193"
        style={{
          maskType: "luminance",
        }}
        maskUnits="userSpaceOnUse"
        x={8}
        y={8}
        width={25}
        height={24}
      >
        <Path d="M8.625 8H32.625V32H8.625V8Z" fill={props.fill ?? 'white'}   fillOpacity={1}/>
      </Mask>
      <G mask="url(#mask0_2504_12193)">
        <Path
          d="M9.09375 31.531H32.1563"
          stroke={props.fill ?? '#F4ADFF'} 
          strokeWidth={1.40625}
          strokeMiterlimit={22.926}
          strokeLinecap="round"
          strokeLinejoin="round"
         fillOpacity={1}/>
        <Path
          d="M9.09375 20.5022L17.3215 12.2744L22.8359 17.7887L31.8282 8.79648"
          stroke={props.fill ?? '#F4ADFF'} 
          strokeWidth={1.40625}
          strokeMiterlimit={22.926}
          strokeLinecap="round"
          strokeLinejoin="round"
         fillOpacity={1}/>
        <Path
          d="M32.1563 10.3433V8.46826H30.2812"
          stroke={props.fill ?? '#F4ADFF'} 
          strokeWidth={1.40625}
          strokeMiterlimit={22.926}
          strokeLinecap="round"
          strokeLinejoin="round"
         fillOpacity={1}/>
        <Path
          d="M14.0625 31.2965V23.7529H10.3125V31.2965"
          stroke={props.fill ?? '#F4ADFF'} 
          strokeWidth={1.40625}
          strokeMiterlimit={22.926}
          strokeLinecap="round"
          strokeLinejoin="round"
         fillOpacity={1}/>
        <Path
          d="M25.3125 31.2965V20.753H21.5625V31.2965"
          stroke={props.fill ?? '#F4ADFF'} 
          strokeWidth={1.40625}
          strokeMiterlimit={22.926}
          strokeLinecap="round"
          strokeLinejoin="round"
         fillOpacity={1}/>
      </G>
    </G>
    <Defs>
      <ClipPath id="clip0_2504_12193">
        <Rect width={24} height={24} fill={props.fill ?? 'white'}  transform="translate(8.625 8)"  fillOpacity={1}/>
      </ClipPath>
    </Defs>
  </Svg>
)
export default Guru
