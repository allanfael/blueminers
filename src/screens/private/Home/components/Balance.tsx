import React from 'react'
import { Pressable, View } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Typography } from '@components/Typography'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@hooks/useTheme'
import { useAccountStore } from '@store/account'
import { userStore } from '@store/user'
import { createStyles } from 'responsive-react-native'
import { currencyParse } from 'utils/currencyParse'
import { hoursParse } from 'utils/hourParse'

interface Props {
  clipboard(): void
  depositNavigation(): void
}

export const Balance = ({ clipboard, depositNavigation }: Props) => {
  const { account } = useAccountStore()
  const { onShowBalance, showBalance } = userStore()
  const backgroundColor = useTheme('button')

  return (
    <View>
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

      <RectButton
        style={[
          styles.button,
          {
            backgroundColor,
          },
        ]}
        onPress={depositNavigation}
      >
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
        <Typography variant="normalMedium" color="white">
          Link de indicação
        </Typography>
        <MaterialCommunityIcons name="content-copy" size={16} color="#fff" />
      </Pressable>
    </View>
  )
}

const styles = createStyles({
  title: { marginTop: 40 },
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  money: {
    marginTop: 6,
    marginRight: 30,
  },
  button: {
    height: 44,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center',
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
  lastIncome: {
    marginLeft: 12,
  },
  incomeGain: {
    marginTop: 40,
  },
  updatedMessage: {
    marginTop: 16,
    fontStyle: 'italic',
  },
})
