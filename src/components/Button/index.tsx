import React from 'react'
import { ActivityIndicator, ViewStyle } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useTheme } from '@hooks/useTheme'
import { createStyles } from 'responsive-react-native'

import { Typography } from '../Typography'

interface Props {
  title: string
  styles?: ViewStyle
  loading?: boolean
  onPress(): void
  testID?: string
}

export const Button = ({ title, styles, onPress, loading, testID }: Props) => {
  const backgroundColor = useTheme('button')
  const loadingColor = useTheme('textButton')

  return (
    <RectButton
      style={[
        styles,
        style.button,
        {
          backgroundColor,
        },
      ]}
      onPress={onPress}
      enabled={!loading}
      testID={testID}
    >
      {loading && <ActivityIndicator size="small" color={loadingColor} />}
      <Typography variant="normalBold" color="textButton">
        {title}
      </Typography>
    </RectButton>
  )
}

const style = createStyles({
  button: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    elevation: 3,
  },
})
