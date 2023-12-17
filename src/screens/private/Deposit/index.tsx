import React, { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, Linking, Pressable, View } from 'react-native'
import { Button } from '@components/Button'
import { CurrencyInput } from '@components/CurrencyInput'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { PrivateRouteProps } from '@navigator/ParamsRoute'
import { useNavigation } from '@react-navigation/native'
import { getQuotation } from '@services/api'
import { api, DepositProps } from '@services/api/api'
import ResponseError from '@services/api/ResponseError'
import { useAccountStore } from '@store/account'
import Checkbox from 'expo-checkbox'
import { createStyles } from 'responsive-react-native'
import { ROUTERS } from 'utils/routers'

import { depositFormSchema, DepositFormType } from './schemas'

export const Deposit = () => {
  const [checked, setChecked] = useState(false)
  const [showTerm, setShowTerm] = useState(false)

  const { navigate } = useNavigation<PrivateRouteProps>()

  const { account, update } = useAccountStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<DepositFormType>({
    resolver: zodResolver(depositFormSchema),
  })

  const title = useMemo(() => {
    if (checked) return 'Confirmar'
    return 'Depositar'
  }, [checked])

  const openLink = async () =>
    await Linking.openURL('https://bluminers.vercel.app/bluminers_contract.pdf')

  const onSubmit = async ({ deposit }: DepositFormType) => {
    Keyboard.dismiss()
    if (!showTerm) return setShowTerm(true)
    if (!checked) return

    try {
      const quotation = await getQuotation()

      const data: DepositProps = {
        account_id: account.id,
        currency: 'BRL',
        value: deposit,
        used_quotation: quotation,
      }

      await api.deposit(data)

      const historic = await api.historic()
      const pendingWithdraw = historic.withdrawals.pending.length

      const updateData = {
        ...account,
        pendingWithdraw,
      }

      update(updateData)

      navigate(ROUTERS.DEPOSIT_CONFIRMATION, { value: Number(deposit) })
      reset()
    } catch (e) {
      if (e instanceof ResponseError) {
        setError('deposit', {
          message: e.message as string,
        })
      }
    }
  }

  return (
    <Screen>
      <Typography variant="LargeBold" color="text">
        Depósito
      </Typography>
      <Typography variant="mediumMedium" color="text" style={styles.message}>
        Quanto você quer depositar?
      </Typography>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        name="deposit"
        defaultValue={0}
        render={({ field: { onChange, value } }) => (
          <CurrencyInput
            min="10,00"
            value={Number(value)}
            onChangeValue={onChange}
            error={errors.deposit?.message}
          />
        )}
      />

      {showTerm && (
        <View>
          <View style={styles.card}>
            <Typography variant="smallMedium" color="textButton">
              Ao confirmar, você irá criar sua solicitação de depósito, você
              será redirecionado para o ambiente onde poderá proceder com a
              transferência do valor informado. Realize o depósito a partir de
              uma conta bancária que possui o mesmo CPF do usuário desta conta
              da Blu Miners. Assim que identificarmos sua transferência, o valor
              já estará rendendo e constará no seu saldo.
            </Typography>
          </View>

          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={checked}
              onValueChange={setChecked}
              color={checked ? '#1f35d9' : undefined}
            />
            <Typography variant="smallMedium" color="info">
              Li e aceito os termos do contrato
            </Typography>
          </View>

          <Pressable style={styles.contractButton} onPress={openLink}>
            <Typography variant="smallMedium" color="textButton">
              Visualizar contrato
            </Typography>
          </Pressable>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          loading={isSubmitting}
          title={title}
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
  container: {
    flex: 1,
    padding: 30,
  },
  input: {
    marginTop: 12,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    width: '100%',
    marginTop: 30,
    backgroundColor: '#6e6e6e',
  },
  section: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    margin: 8,
  },
  contractButton: {
    marginTop: 8,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#333',
  },
})
