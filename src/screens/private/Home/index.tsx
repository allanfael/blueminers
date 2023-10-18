import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, RefreshControl, useColorScheme, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useToast } from 'react-native-toast-notifications'
import { Loading } from '@components/Loading'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { PrivateRouteProps } from '@navigator/ParamsRoute'
import { useNavigation } from '@react-navigation/native'
import { get } from '@services/api'
import ResponseError from '@services/api/ResponseError'
import { Account, useAccountStore } from '@store/account'
import { userStore } from '@store/user'
import { colors } from '@themes/colors'
import * as Clipboard from 'expo-clipboard'
import { createStyles } from 'responsive-react-native'
import { hasMoney } from 'utils/ableToWithdraw'
import { currencyParse } from 'utils/currencyParse'
import { hoursParse } from 'utils/hourParse'
import { ROUTERS } from 'utils/routers'

export const Home = () => {
  const theme = useColorScheme() ?? 'light'

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

  const optionBackgroundColor = colors[theme].input
  const iconColor = colors[theme].text

  const options = [
    {
      label: 'Saques',
      icon: (
        <MaterialIcons
          name="vertical-align-bottom"
          size={24}
          color={iconColor}
        />
      ),
      onPress: () => withdrawHistoricNavigation(),
    },
    {
      label: 'Depósitos',
      icon: (
        <MaterialIcons name="vertical-align-top" size={24} color={iconColor} />
      ),
      onPress: () => depositHistoricNavigation(),
    },
  ]

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
      <Typography variant="smallMedium" color="text">
        Saldo
      </Typography>

      <View style={styles.balance}>
        <Typography variant="LargeBold" style={styles.money} color="text">
          {showBalance ? currencyParse(account.currentBalance) : '****'}
        </Typography>

        <MaterialIcons
          name={showBalance ? 'visibility' : 'visibility-off'}
          size={26}
          color="#666"
          onPress={() => onShowBalance(!showBalance)}
        />
      </View>

      <RectButton style={styles.button} onPress={depositNavigation}>
        <Typography variant="smallMedium" color="textButton">
          Depositar
        </Typography>
      </RectButton>

      <Typography variant="smallMedium" color="info" style={styles.incomeGain}>
        Nosso rendimento com mineração foi de{' '}
        {account.incomePercent?.toString()}%
      </Typography>

      <Typography
        variant="smallMedium"
        color="info"
        style={styles.updatedMessage}
      >
        Ultima atualização {hoursParse(account.lastUpdate)}
      </Typography>

      <Pressable style={styles.inviteCard} onPress={clipboard}>
        <Typography variant="normalMedium" color="textButton">
          Link de indicação
        </Typography>
        <MaterialCommunityIcons name="content-copy" size={16} color="#fff" />
      </Pressable>

      <Typography variant="LargeBold" color="text" style={styles.title}>
        Histórico
      </Typography>

      <View style={[styles.row, styles.top]}>
        {options.map((item) => (
          <Pressable
            key={item.label}
            style={styles.optionContainer}
            onPress={item.onPress}
          >
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: optionBackgroundColor,
                },
              ]}
            >
              {item.icon}
            </View>
            <Typography variant="normalBold" color="text">
              {item.label}
            </Typography>
          </Pressable>
        ))}
      </View>

      <Typography variant="LargeBold" color="text" style={styles.title}>
        Meus Ganhos
      </Typography>

      <View style={[styles.card, styles.cardAccGain]}>
        <Typography variant="normalMedium" color="text">
          Ganho acumulado
        </Typography>

        <View style={[styles.row, styles.between]}>
          <Typography variant="mediumBold" style={styles.money} color="text">
            {showBalance ? currencyParse(account.accumulatedGain) : '****'}
          </Typography>
        </View>
      </View>

      <View style={[styles.card, styles.cardLastIncome]}>
        <Typography variant="normalMedium" color="text">
          Rendimento do dia
        </Typography>

        <View style={[styles.row, styles.between]}>
          <Typography variant="mediumBold" style={styles.money} color="text">
            {currencyParse(account.lastIncome)}
          </Typography>
        </View>
      </View>

      <View style={[styles.card, styles.cardAvailable]}>
        <Typography variant="normalMedium" color="text">
          Ganho disponível
        </Typography>
        <Typography variant="mediumBold" style={styles.money} color="text">
          {currencyParse(account.available)}
        </Typography>
        {hasMoney(account.available) && (
          <RectButton style={styles.button} onPress={withdrawNavigation}>
            <Typography variant="smallMedium" color="textButton">
              Retirar
            </Typography>
          </RectButton>
        )}
      </View>

      <View style={[styles.card, styles.cardBroker]}>
        <Typography variant="normalMedium" color="text">
          Ganho ID Broker
        </Typography>
        <Typography variant="mediumBold" style={styles.money} color="text">
          {currencyParse(account.brokerGain)}
        </Typography>
      </View>
    </Screen>
  )
}

const styles = createStyles({
  title: { marginTop: 40 },
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inviteCard: {
    padding: 16,
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 12,
    backgroundColor: '#0c7c65',
    marginTop: 30,
    marginBottom: 30,
    flexDirection: 'row',
    gap: 10,
  },
  incomeGain: {
    marginTop: 40,
  },
  lastIncome: {
    marginLeft: 12,
  },
  button: {
    height: 44,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f35d9',
    borderRadius: 22,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    elevation: 3,
  },
  currentMoney: {
    paddingTop: 80,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 20,
    backgroundColor: '#1f35d9',
  },
  content: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  money: {
    marginTop: 6,
    marginRight: 30,
  },
  cardLastIncome: {
    backgroundColor: '#ff7f505f',
  },
  cardAvailable: {
    backgroundColor: '#de31624d',
  },
  cardAccGain: {
    backgroundColor: '#0d6dfd47',
  },
  cardBroker: {
    backgroundColor: '#f1c40f62',
    marginBottom: 10,
  },
  card: {
    marginTop: 30,
    width: '100%',
    borderRadius: 14,
    padding: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  between: {
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  errorCard: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'rgb(220 38 38)',
    padding: 20,
  },
  updatedMessage: {
    marginTop: 16,
    fontStyle: 'italic',
  },
  top: {
    marginTop: 20,
  },
  circle: {
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 33,
    marginBottom: 10,
  },
  optionContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
})
