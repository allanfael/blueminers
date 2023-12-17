import { useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import { PrivateRouteProps } from '@navigator/ParamsRoute'
import { useNavigation } from '@react-navigation/native'
import { api, WithdrawProps } from '@services/api/api'
import ResponseError from '@services/api/ResponseError'
import { Account, useAccountStore } from '@store/account'
import { roundedValue } from 'utils/currencyParse'
import { ROUTERS } from 'utils/routers'

import { withdrawFormSchema, WithdrawFormType } from './schemas'

type Props = {
  onSubmit(values: WithdrawFormType): void
  onMax(): void
  account: Account
}

export const useWithdraw = (): Props => {
  const { navigate } = useNavigation<PrivateRouteProps>()

  const { account } = useAccountStore()

  const { setError, setValue, reset } = useForm<WithdrawFormType>({
    resolver: zodResolver(withdrawFormSchema),
  })

  const onSubmit = async ({ withdraw }: WithdrawFormType) => {
    Keyboard.dismiss()

    try {
      const data: WithdrawProps = {
        account_id: account.id,
        currency: 'BRL',
        value: withdraw,
      }

      await api.withdraw(data)

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

  const onMax = () => {
    if (account.available && account.available < 0) return

    setValue('withdraw', roundedValue(account.available))
  }

  return {
    onSubmit,
    onMax,
    account,
  }
}
