import { useCallback, useEffect, useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { PrivateRouteProps } from '@navigator/ParamsRoute'
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api/api'
import ResponseError from '@services/api/ResponseError'
import { Account, useAccountStore } from '@store/account'
import { userStore } from '@store/user'
import * as Clipboard from 'expo-clipboard'
import { ROUTERS } from 'utils/routers'

export type UseHomeProps = {
  error: string
  loading: boolean
  refresh: boolean
  account: Account
  showBalance: boolean
  onShowBalance(value: boolean): void
  depositNavigation(): void
  withdrawNavigation(): void
  depositHistoricNavigation(): void
  withdrawHistoricNavigation(): void
  clipboard(): void
  update(): void
}

export const useHome = (): UseHomeProps => {
  const { save, account, update: updateStore } = useAccountStore()
  const { logout, onShowBalance, showBalance } = userStore()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const { navigate } = useNavigation<PrivateRouteProps>()
  const toast = useToast()

  const depositNavigation = () => navigate(ROUTERS.DEPOSIT)
  const withdrawNavigation = () => navigate(ROUTERS.WITHDRAW)
  const depositHistoricNavigation = () =>
    navigate(ROUTERS.HISTORIC_OPTIONS, { type: 'deposit' })
  const withdrawHistoricNavigation = () =>
    navigate(ROUTERS.HISTORIC_OPTIONS, { type: 'withdraw' })

  const clipboard = async () => {
    if (account.user) {
      const link = `https://bluminers.vercel.app/user/signup?broker=${account.user}`
      await Clipboard.setStringAsync(link)
      toast.show('Link copiado com sucesso')

      return
    }

    toast.show('Não foi possível copiar o link')
  }

  const update = async () => {
    try {
      setRefresh(true)
      const home = await api.home()
      const historic = await api.historic()

      const pendingWithdraw = historic.withdrawals.pending.length

      const data = {
        ...home,
        pendingWithdraw,
      }

      updateStore(data)
      setError('')
    } catch (e) {
      if (e instanceof ResponseError) {
        return setError(e.message as string)
      }

      logout()
    } finally {
      setRefresh(false)
    }
  }

  const fetchHome = useCallback(async () => {
    try {
      setLoading(true)
      const home = await api.home()
      const historic = await api.historic()

      const pendingWithdraw = historic.withdrawals.pending.length

      const data = {
        ...home,
        pendingWithdraw,
      }

      save(data)
    } catch (e) {
      if (e instanceof ResponseError) {
        return setError(e.message as string)
      }

      logout()
    } finally {
      setLoading(false)
    }
  }, [save, logout])

  useEffect(() => {
    fetchHome()
  }, [fetchHome])

  return {
    error,
    loading,
    refresh,
    depositNavigation,
    withdrawNavigation,
    depositHistoricNavigation,
    withdrawHistoricNavigation,
    clipboard,
    update,
    account,
    showBalance,
    onShowBalance,
  }
}
