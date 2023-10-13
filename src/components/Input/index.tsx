import React, { LegacyRef } from 'react'
import {
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native'
import { colors } from '@themes/colors'
import { createStyles } from 'responsive-react-native'

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
    const theme = useColorScheme() ?? 'light'

    const backgroundColor = colors[theme].input

    const text = colors[theme].text

    return (
      <>
        <View style={[styles.view, containerStyle]}>
          <Typography variant="smallMedium" color="info">
            {label}
          </Typography>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor,
                color: text,
              },
            ]}
            ref={ref}
            {...restProps}
          />
        </View>
        {!!error && (
          <Typography variant="smallMedium" color="danger" style={styles.error}>
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
    fontFamily: 'Muli_400Regular',
  },
})
