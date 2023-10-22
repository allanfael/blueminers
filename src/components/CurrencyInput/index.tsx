import React from 'react'
import { Pressable, View } from 'react-native'
import DefaultCurrencyInput, {
  CurrencyInputProps,
} from 'react-native-currency-input'
import { useTheme } from '@hooks/useTheme'
import { createStyles } from 'responsive-react-native'

import { Typography } from '../Typography'

interface Props extends CurrencyInputProps {
  showInfo?: boolean
  error?: string
  min: string
  onMax?: () => void
  showMaxButton?: boolean
}

export const CurrencyInput = ({
  showInfo = true,
  error,
  min,
  onMax,
  showMaxButton = false,
  ...props
}: Props) => {
  const backgroundColor = useTheme('input')
  const text = useTheme('text')
  const placeholderTextColor = useTheme('info')

  return (
    <>
      <View style={styles.view}>
        {showInfo && (
          <View style={[styles.view, styles.info]}>
            <Typography variant="smallMedium" color="info">
              Mínimo: R$ {min}
            </Typography>
            <Typography variant="smallMedium" color="info">
              Máximo: R$ 100.000,00
            </Typography>
          </View>
        )}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor,
            },
          ]}
        >
          <DefaultCurrencyInput
            placeholderTextColor={placeholderTextColor}
            prefix="R$"
            delimiter="."
            separator=","
            precision={2}
            minValue={0}
            style={[
              styles.input,
              {
                color: text,
              },
            ]}
            {...props}
          />
          <Pressable
            hitSlop={{
              top: 12,
              bottom: 12,
              left: 12,
              right: 12,
            }}
            onPress={onMax}
          >
            {showMaxButton && (
              <Typography variant="smallBold" color="text">
                MÁX
              </Typography>
            )}
          </Pressable>
        </View>
      </View>
      {!!error && (
        <Typography variant="smallBold" color="danger" style={styles.message}>
          {error}
        </Typography>
      )}
    </>
  )
}

const styles = createStyles({
  view: {
    width: '100%',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginTop: 4,
    height: 56,
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  input: {
    fontSize: 16,
    fontFamily: 'Muli_700Bold',
    width: '80%',
    height: 56,
  },
  message: {
    marginTop: 8,
  },
})
