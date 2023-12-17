import React from 'react'
import { RefreshControl, View } from 'react-native'
import { Button } from '@components/Button'
import { Loading } from '@components/Loading'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { createStyles } from 'responsive-react-native'

import { Balance } from './components/Balance'
import { Earnings } from './components/Earnings'
import { Historic } from './components/Historic'
import { useHome } from './useHome'

export const Home = () => {
  const {
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
  } = useHome()

  if (loading) return <Loading />

  if (error) {
    return (
      <Screen
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={update} />
        }
      >
        <View style={styles.errorCard}>
          <Typography variant="smallMedium" color="danger">
            {error}
          </Typography>
        </View>
        <Button
          title="Tentar novamente"
          onPress={update}
          styles={styles.tryButton}
        />
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
      <Balance
        clipboard={clipboard}
        depositNavigation={depositNavigation}
        account={account}
        onShowBalance={onShowBalance}
        showBalance={showBalance}
      />
      <Historic
        account={account}
        withdrawHistoricNavigation={withdrawHistoricNavigation}
        depositHistoricNavigation={depositHistoricNavigation}
      />
      <Earnings
        withdrawNavigation={withdrawNavigation}
        account={account}
        showBalance={showBalance}
      />
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
  tryButton: {
    marginTop: 100,
  },
})
