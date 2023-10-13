import React from 'react'
import { Text, TextProps, TextStyle } from 'react-native'

import typography from '../../themes/typography'

interface TypographyProps extends TextProps {
  variant: keyof typeof typography
  children?: React.ReactNode
  style?: TextStyle
  color?: string
}

export function Typography(props: TypographyProps) {
  const { variant, children, style, color, ...restProps } = props

  const styleSelected = {
    ...(typography[variant] as TextStyle),
  }

  if (color) {
    styleSelected.color = color
  }

  return (
    <Text style={{ ...styleSelected, ...style }} {...restProps}>
      {children}
    </Text>
  )
}
