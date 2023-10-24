import React from 'react'
import { Image, Pressable } from 'react-native'
import { logo } from '@assets/index'
import { Typography } from '@components/Typography'
import { MaterialIcons } from '@expo/vector-icons'
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
import { createStyles } from 'responsive-react-native'
import { ROUTERS } from 'utils/routers'

import { PrivateParamsRoute } from './ParamsRoute'

const Stack = createStackNavigator<PrivateParamsRoute>()

export const PrivateStacks = () => {
  const { logout } = userStore()
  const background = useTheme('background')
  const text = useTheme('text')

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
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
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
                <Typography variant="smallBold" color="text">
                  Sair
                </Typography>
                <MaterialIcons
                  name="logout"
                  size={26}
                  color={text}
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
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
          }}
        />
        <Stack.Screen
          name={ROUTERS.DEPOSIT_CONFIRMATION}
          component={DepositConfirmation}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          }}
        />
        <Stack.Screen
          name={ROUTERS.WITHDRAW}
          component={Withdraw}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
          }}
        />
        <Stack.Screen
          name={ROUTERS.WITHDRAW_CONFIRMATION}
          component={WithdrawConfirmation}
          options={{
            headerTitle: '',
            headerBackTitleVisible: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
