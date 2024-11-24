import React from 'react'
import { Image } from 'react-native'
import { logo } from '@assets/index'
import { createStyles } from 'responsive-react-native'

export const Logo = () => {
  return (
    <Image source={logo} resizeMode="contain" alt="" style={styles.image} />
  )
}

const styles = createStyles({
  image: {
    height: 20,
    width: 120,
  },
})
