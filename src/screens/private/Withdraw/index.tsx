import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { View } from 'react-native'
import { Button } from '@components/Button'
import { CurrencyInput } from '@components/CurrencyInput'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { createStyles } from 'responsive-react-native'
import { currencyParse } from 'utils/currencyParse'

import { withdrawFormSchema, WithdrawFormType } from './schemas'
import { useWithdraw } from './useWithdraw'

export const Withdraw = () => {
  const { onSubmit, onMax, account } = useWithdraw()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WithdrawFormType>({
    resolver: zodResolver(withdrawFormSchema),
  })

  return (
    <Screen>
      <Typography variant="LargeBold" color="text">
        Saque
      </Typography>

      <Typography variant="mediumMedium" color="text" style={styles.message}>
        Quanto você quer sacar?
      </Typography>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        defaultValue={0}
        name="withdraw"
        render={({ field: { onChange, value } }) => (
          <CurrencyInput
            min="1,00"
            value={Number(value)}
            onChangeValue={onChange}
            error={errors.withdraw?.message}
            showMaxButton
            onMax={onMax}
          />
        )}
      />

      <Typography variant="smallBold" color="info" style={styles.available}>
        Disponível {currencyParse(account.available)}
      </Typography>

      <View style={styles.card}>
        <Typography variant="smallMedium" color="white">
          Ao confirmar, você irá criar sua solicitação de saque, iremos
          processar sua solicitação em até 2 dias úteis.
        </Typography>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          loading={isSubmitting}
          title="Confirmar"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </Screen>
  )
}

const styles = createStyles({
  message: {
    marginBottom: 40,
    marginTop: 40,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  input: {
    marginTop: 12,
  },
  available: {
    marginTop: 6,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginTop: 30,
    backgroundColor: '#6e6e6e',
  },
})
