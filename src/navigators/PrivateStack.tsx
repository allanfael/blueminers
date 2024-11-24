import React from 'react'
import { Logo } from '@components/Logo'
import { Logout as LogoutButton } from '@components/Logout'
import { useTheme } from '@hooks/useTheme'
import {
  CardStyleInterpolators,
  createStackNavigator,
  HeaderStyleInterpolators,
} from '@react-navigation/stack'
import { Deposit } from '@screens/private/Deposit'
import { DepositConfirmation } from '@screens/private/DepositConfirmation'
import { Historic } from '@screens/private/Historic'
import { HistoricOptions } from '@screens/private/HistoricOptions'
import { Home } from '@screens/private/Home'
import { Withdraw } from '@screens/private/Withdraw'
import { WithdrawConfirmation } from '@screens/private/WithdrawConfirmation'
import { userStore } from '@store/user'
import { ROUTERS } from 'utils/routers'

import { PrivateParamsRoute } from './ParamsRoute'

const Stack = createStackNavigator<PrivateParamsRoute>()

export const PrivateStacks = () => {
  const { logout } = userStore()
  const background = useTheme('background')
  const text = useTheme('text')

  const cardVerticalInterpolator = CardStyleInterpolators.forVerticalIOS
  const cardHorizontalInterpolator = CardStyleInterpolators.forHorizontalIOS

  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          gestureEnabled: false,
          headerTintColor: text,
          headerStyle: {
            backgroundColor: background,
          },
          headerShadowVisible: false,
          headerLeftContainerStyle: {
            paddingLeft: 12,
          },
        }}
      >
        <Stack.Screen
          name={ROUTERS.HOME}
          component={Home}
          options={{
            cardStyleInterpolator: cardVerticalInterpolator,
            headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
            headerTitle: () => <Logo />,
            headerRight: () => <LogoutButton onPress={logout} />,
          }}
        />
        <Stack.Screen
          name={ROUTERS.DEPOSIT}
          component={Deposit}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
            cardStyleInterpolator: cardVerticalInterpolator,
            headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
          }}
        />
        <Stack.Screen
          name={ROUTERS.DEPOSIT_CONFIRMATION}
          component={DepositConfirmation}
          options={{
            headerShown: false,
            cardStyleInterpolator: cardHorizontalInterpolator,
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          }}
        />
        <Stack.Screen
          name={ROUTERS.WITHDRAW}
          component={Withdraw}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
            cardStyleInterpolator: cardVerticalInterpolator,
            headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
          }}
        />
        <Stack.Screen
          name={ROUTERS.WITHDRAW_CONFIRMATION}
          component={WithdrawConfirmation}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
            cardStyleInterpolator: cardHorizontalInterpolator,
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          }}
        />
        <Stack.Screen
          name={ROUTERS.HISTORIC_OPTIONS}
          component={HistoricOptions}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name={ROUTERS.HISTORIC}
          component={Historic}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}
