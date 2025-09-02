import React from "react"

// To switch backend, change this single import:
// Expo:
import { LinearGradient as LinearGradientBase, LinearGradientProps } from "expo-linear-gradient"
// React Native (uncomment below and comment the Expo import above):
// import LinearGradientBase from "react-native-linear-gradient"

export type Point = { x: number; y: number }

/**
 * A unified LinearGradient wrapper. By default uses expo-linear-gradient.
 * To switch to react-native-linear-gradient, change the import above.
 */
export function LinearGradient(props: LinearGradientProps) {
  const { children } = props

  // Expo variant does not support angle props; they are ignored if passed
  return <LinearGradientBase {...props}>{children}</LinearGradientBase>
}

export default LinearGradient
