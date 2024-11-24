/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react'
import { useToast } from 'react-native-toast-notifications'
import { api } from '@services/api/api'
import ResponseError from '@services/api/ResponseError'
import { Account, useAccountStore } from '@store/account'
import { userStore } from '@store/user'
import * as Clipboard from 'expo-clipboard'

export type UseHomeProps = {
  error: string
  loading: boolean
  refresh: boolean
  account: Account
  showBalance: boolean
  onShowBalance(value: boolean): void
  clipboard(): void
  update(): void
}

export const useHome = (): UseHomeProps => {
  const { save, account, update: updateStore } = useAccountStore()
  const { logout, onShowBalance, showBalance } = userStore()

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const toast = useToast()

  const clipboard = async () => {
    if (account.user) {
      const link = `https://bluminers.vercel.app/user/signup?broker=${account.user}`
      await Clipboard.setStringAsync(link)
      toast.show('Link copiado com sucesso')

      return
    }

    toast.show('Não foi possível copiar o link')
  }

  const fetch = useCallback(
    async (
      loading: (loading: boolean) => void,
      saveData: (data: Account) => void,
    ) => {
      try {
        loading(true)
        const home = await api.home()
        const historic = await api.historic()

        const pendingWithdraw = historic.withdrawals.pending.length

        const data = {
          ...home,
          pendingWithdraw,
        }

        saveData(data)
      } catch (e) {
        if (e instanceof ResponseError) {
          return setError(e.message as string)
        }

        logout()
      } finally {
        loading(false)
      }
    },
    [save, logout],
  )

  useEffect(() => {
    fetch(setLoading, save)
  }, [])

  const update = () => fetch(setRefresh, updateStore)

  return {
    error,
    loading,
    refresh,
    clipboard,
    update,
    account,
    showBalance,
    onShowBalance,
  }
}
