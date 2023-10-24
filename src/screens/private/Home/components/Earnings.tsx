import React from 'react'
import { View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Typography } from '@components/Typography'
import { useTheme } from '@hooks/useTheme'
import { useAccountStore } from '@store/account'
import { userStore } from '@store/user'
import { createStyles } from 'responsive-react-native'
import { hasMoney } from 'utils/ableToWithdraw'
import { currencyParse, roundedValue } from 'utils/currencyParse'

interface Props {
  withdrawNavigation(): void
}

export const Earnings = ({ withdrawNavigation }: Props) => {
  const { showBalance } = userStore()
  const { account } = useAccountStore()

  const backgroundColor = useTheme('button')

  const hasBlucoin = account.blucoinBalance && account.blucoinBalance > 0

  return (
    <View>
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
          {showBalance ? currencyParse(account.available) : '****'}
        </Typography>
        {hasMoney(account.available) && (
          <RectButton
            style={[
              styles.button,
              {
                backgroundColor,
              },
            ]}
            onPress={withdrawNavigation}
          >
            <Typography variant="smallBold" color="textButton">
              Retirar
            </Typography>
          </RectButton>
        )}
      </View>

      {!!hasBlucoin && (
        <View style={[styles.card, styles.cardBlucoin]}>
          <Typography variant="normalMedium" color="text">
            Blucoin
          </Typography>
          <Typography variant="mediumBold" style={styles.money} color="text">
            {roundedValue(account.blucoinBalance)} BLC
          </Typography>
        </View>
      )}

      <View style={[styles.card, styles.cardBroker]}>
        <Typography variant="normalMedium" color="text">
          Ganho ID Broker
        </Typography>
        <Typography variant="mediumBold" style={styles.money} color="text">
          {currencyParse(account.brokerGain)}
        </Typography>
      </View>
    </View>
  )
}

const styles = createStyles({
  title: { marginTop: 40 },
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
  money: {
    marginTop: 6,
    marginRight: 30,
  },
  cardLastIncome: {
    backgroundColor: '#ff7f5072',
  },
  cardAvailable: {
    backgroundColor: '#de31626c',
  },
  cardAccGain: {
    backgroundColor: '#0d6dfd76',
  },
  cardBlucoin: {
    backgroundColor: '#590dfd67',
  },
  cardBroker: {
    backgroundColor: '#f1c40f68',
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
})
