import React from 'react'
import { Image, Pressable } from 'react-native'
import { logo } from '@assets/index'
import { Typography } from '@components/Typography'
import { MaterialIcons } from '@expo/vector-icons'
import { createStackNavigator } from '@react-navigation/stack'
import { Deposit } from '@screens/private/Deposit'
import { DepositConfirmation } from '@screens/private/DepositConfirmation'
import { Home } from '@screens/private/Home'
import { Withdraw } from '@screens/private/Withdraw'
import { WithdrawConfirmation } from '@screens/private/WithdrawConfirmation'
import { userStore } from '@store/user'
import { createStyles } from 'responsive-react-native'
import { ROUTERS } from 'utils/routers'

import { PrivateParamsRoute } from './ParamsRoute'

const Stack = createStackNavigator<PrivateParamsRoute>()

export const PrivateStacks = () => {
  const { logout } = userStore()

  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          gestureEnabled: false,
          headerTintColor: '#000',
          headerStyle: {
            backgroundColor: '#fafafa',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name={ROUTERS.HOME}
          component={Home}
          options={{
            headerTitle: () => (
              <Image
                source={logo}
                resizeMode="contain"
                alt=""
                style={styles.image}
              />
            ),
            headerRight: () => (
              <Pressable style={styles.logout} onPress={logout}>
                <Typography variant="smallMedium" color="#000">
                  Sair
                </Typography>
                <MaterialIcons
                  name="logout"
                  size={26}
                  style={{
                    alignSelf: 'center',
                  }}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name={ROUTERS.DEPOSIT}
          component={Deposit}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name={ROUTERS.DEPOSIT_CONFIRMATION}
          component={DepositConfirmation}
          options={{
            headerBackTitleVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={ROUTERS.WITHDRAW}
          component={Withdraw}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name={ROUTERS.WITHDRAW_CONFIRMATION}
          component={WithdrawConfirmation}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

const styles = createStyles({
  image: {
    height: 20,
    width: 120,
  },
  logout: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingRight: 12,
  },
})
