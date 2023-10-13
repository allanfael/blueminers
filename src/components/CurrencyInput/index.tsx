import React from 'react'
import { useColorScheme, View } from 'react-native'
import DefaultCurrencyInput, {
  CurrencyInputProps,
} from 'react-native-currency-input'
import { colors } from '@themes/colors'
import { createStyles } from 'responsive-react-native'

import { Typography } from '../Typography'

interface Props extends CurrencyInputProps {
  showInfo?: boolean
  error?: string
  min: string
}

export const CurrencyInput = ({
  showInfo = true,
  error,
  min,
  ...props
}: Props) => {
  const theme = useColorScheme() ?? 'light'

  const backgroundColor = colors[theme].input
  const text = colors[theme].text

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
        <DefaultCurrencyInput
          prefix="R$"
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          style={[
            styles.input,
            {
              backgroundColor,
              color: text,
            },
          ]}
          {...props}
        />
      </View>
      {!!error && (
        <Typography variant="smallMedium" color="danger" style={styles.message}>
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
  input: {
    marginTop: 4,
    fontSize: 16,
    padding: 10,
    height: 56,
    borderRadius: 12,
    fontFamily: 'Muli_700Bold',
  },
  message: {
    marginTop: 8,
  },
})
