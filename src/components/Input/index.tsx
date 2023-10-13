import React, { LegacyRef } from 'react'
import { TextInput, TextInputProps, View, ViewStyle } from 'react-native'
import { createStyles } from 'responsive-react-native'

import { colors } from '../../themes/colors'
import { Typography } from '../Typography'

interface Props extends TextInputProps {
  label: string
  containerStyle?: ViewStyle
  value?: string
  onChangeText(value: string): void
  placeholder: string
  error?: string
}

export const Input = React.forwardRef(
  (
    { label, containerStyle, error, ...restProps }: Props,
    ref: LegacyRef<TextInput>,
  ) => {
    return (
      <>
        <View style={[styles.view, containerStyle]}>
          <Typography variant="smallMedium" color="#000">
            {label}
          </Typography>
          <TextInput style={styles.input} ref={ref} {...restProps} />
        </View>
        {!!error && (
          <Typography
            variant="smallRegular"
            color="rgb(220 38 38)"
            style={styles.error}
          >
            {error}
          </Typography>
        )}
      </>
    )
  },
)

Input.displayName = 'Input'

const styles = createStyles({
  error: {
    marginTop: 8,
  },
  view: {
    width: '100%',
  },
  input: {
    marginTop: 4,
    fontSize: 16,
    padding: 10,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    color: '#000',
    fontFamily: 'Muli_400Regular',
  },
})
