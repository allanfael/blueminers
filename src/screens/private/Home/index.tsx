import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { Loading } from '@components/Loading'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { PrivateRouteProps } from '@navigator/ParamsRoute'
import { useNavigation } from '@react-navigation/native'
import { get } from '@services/api'
import ResponseError from '@services/api/ResponseError'
import { Account, useAccountStore } from '@store/account'
import { userStore } from '@store/user'
import * as Clipboard from 'expo-clipboard'
import { createStyles } from 'responsive-react-native'
import { ROUTERS } from 'utils/routers'

import { Balance } from './components/Balance'
import { Earnings } from './components/Earnings'
import { Historic } from './components/Historic'

export const Home = () => {
  const { save, account, update: updateStore } = useAccountStore()
  const { logout } = userStore()

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
      const response: any = await get({
        url: '/api/user/account/retrieve',
      })

      const data: Account = {
        id: response.account._id,
        user: response.account.user,
        currentBalance: response.account.balance,
        accumulatedGain: response.account.acc_gain,
        available: response.account.available,
        brokerGain: response.account.broker_gain,
        lastIncome: response.account.last_income,
        incomePercent: response.lastIncome.income,
        lastUpdate: response.lastIncome.updatedAt,
        blucoinBalance: response.account.blucoin_balance,
      }

      updateStore(data)
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
      const response: any = await get({
        url: '/api/user/account/retrieve',
      })

      const data: Account = {
        user: response.account.user,
        id: response.account._id,
        currentBalance: response.account.balance,
        accumulatedGain: response.account.acc_gain,
        available: response.account.available,
        brokerGain: response.account.broker_gain,
        lastIncome: response.account.last_income,
        incomePercent: response.lastIncome.income,
        lastUpdate: response.lastIncome.updatedAt,
        blucoinBalance: response.account.blucoin_balance,
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

  if (loading) return <Loading />

  if (error) {
    return (
      <Screen>
        <View style={styles.errorCard}>
          <Typography variant="smallMedium" color="danger">
            {error}
          </Typography>
        </View>
      </Screen>
    )
  }

  return (
    <Screen
      style={styles.content}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={update} />
      }
    >
      <Balance clipboard={clipboard} depositNavigation={depositNavigation} />
      <Historic
        withdrawHistoricNavigation={withdrawHistoricNavigation}
        depositHistoricNavigation={depositHistoricNavigation}
      />
      <Earnings withdrawNavigation={withdrawNavigation} />
    </Screen>
  )
}

const styles = createStyles({
  content: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  errorCard: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgb(220 38 38)',
    padding: 20,
  },
})
