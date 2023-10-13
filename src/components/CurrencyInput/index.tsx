import React from 'react'
import { View } from 'react-native'
import DefaultCurrencyInput, {
  CurrencyInputProps,
} from 'react-native-currency-input'
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
  return (
    <>
      <View style={styles.view}>
        {showInfo && (
          <View style={[styles.view, styles.info]}>
            <Typography variant="smallMedium" color="#666">
              Mínimo: R$ {min}
            </Typography>
            <Typography variant="smallMedium" color="#666">
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
          style={styles.input}
          {...props}
        />
      </View>
      {!!error && (
        <Typography
          variant="smallRegular"
          color="rgb(220 38 38)"
          style={styles.message}
        >
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
    backgroundColor: '#e0e0e0',
    color: '#000',
    fontFamily: 'Muli_700Bold',
  },
  message: {
    marginTop: 8,
  },
})
