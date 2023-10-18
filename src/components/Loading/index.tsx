import React, { useRef } from 'react'
import { useColorScheme, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { createStyles } from 'responsive-react-native'

export const Loading = () => {
  const animation = useRef(null)
  const theme = useColorScheme() ?? 'light'

  const loading =
    theme === 'dark'
      ? require('../../assets/dark-loading.json')
      : require('../../assets/loading.json')

  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 200,
          height: 200,
          marginBottom: 100,
        }}
        source={loading}
      />
    </View>
  )
}

const styles = createStyles({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})
