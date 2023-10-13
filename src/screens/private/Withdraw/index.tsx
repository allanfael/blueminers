import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, View } from 'react-native'
import { Button } from '@components/Button'
import { CurrencyInput } from '@components/CurrencyInput'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { PrivateRouteProps } from '@navigator/ParamsRoute'
import { useNavigation } from '@react-navigation/native'
import { post } from '@services/api'
import ResponseError from '@services/api/ResponseError'
import { useAccountStore } from '@store/account'
import { createStyles } from 'responsive-react-native'
import { currencyParse } from 'utils/currencyParse'
import { ROUTERS } from 'utils/routers'

import { withdrawFormSchema, WithdrawFormType } from './schemas'

export const Withdraw = () => {
  const { navigate } = useNavigation<PrivateRouteProps>()

  const { account } = useAccountStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<WithdrawFormType>({
    resolver: zodResolver(withdrawFormSchema),
  })

  const onSubmit = async ({ withdraw }: WithdrawFormType) => {
    Keyboard.dismiss()

    try {
      const data = {
        account_id: account.id,
        currency: 'BRL',
        value: withdraw,
      }

      await post({
        url: '/api/user/account/withdraw',
        data,
      })

      navigate(ROUTERS.WITHDRAW_CONFIRMATION, { value: Number(withdraw) })
      reset()
    } catch (e) {
      if (e instanceof ResponseError) {
        setError('withdraw', {
          message: e.message as string,
        })
      }
    }
  }

  return (
    <Screen>
      <Typography variant="LargeBold" color="#000">
        Saque
      </Typography>

      <Typography variant="mediumMedium" color="#000" style={styles.message}>
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
          />
        )}
      />

      <Typography variant="smallMedium" color="#666" style={styles.available}>
        Disponível {currencyParse(account.available)}
      </Typography>

      <View style={styles.card}>
        <Typography variant="smallMedium" color="#fff">
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
