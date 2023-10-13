import React, { useRef } from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import { createStyles } from 'responsive-react-native'

export const Loading = () => {
  const animation = useRef(null)

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
        source={require('../../assets/loading.json')}
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
