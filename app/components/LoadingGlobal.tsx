/* eslint-disable react-native/no-color-literals */
import { createRef, useImperativeHandle, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"

interface ILoadingGlobalRef {
  start: (key: string) => void
  end: (key: string) => void
}

export const LoadingGlobalRef = createRef<ILoadingGlobalRef>()

const LoadingGlobal = () => {
  const [LoadingGlobal, setLoadingGlobal] = useState<string[]>([])

  useImperativeHandle(LoadingGlobalRef, () => {
    return {
      start: (key) => {
        setLoadingGlobal((LoadingGlobal) => LoadingGlobal.concat(key))
      },
      end: (key) => {
        setLoadingGlobal((LoadingGlobal) => LoadingGlobal.filter((keys) => keys !== key))
      },
    }
  }, [])

  return (
    LoadingGlobal.length > 0 && (
      <View style={styles.root}>
        <ActivityIndicator color="white" />
      </View>
    )
  )
}

export default LoadingGlobal

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "100%",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
  },
})
