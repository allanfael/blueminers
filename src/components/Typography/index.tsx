import React from 'react'
import { Text, TextProps, TextStyle, useColorScheme } from 'react-native'
import { colors } from '@themes/colors'

import typography from '../../themes/typography'

interface TypographyProps extends TextProps {
  variant: keyof typeof typography
  children?: React.ReactNode
  style?: TextStyle
  color?: keyof typeof colors.light
}

export function Typography(props: TypographyProps) {
  const { variant, children, style, color, ...restProps } = props

  const theme = useColorScheme() ?? 'light'

  const styleSelected = {
    ...(typography[variant] as TextStyle),
  }

  if (color) {
    styleSelected.color = colors[theme][color]
  }

  return (
    <Text style={{ ...styleSelected, ...style }} {...restProps}>
      {children}
    </Text>
  )
}
