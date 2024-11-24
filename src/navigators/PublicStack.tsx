import React from 'react'
import { Logo } from '@components/Logo'
import { useTheme } from '@hooks/useTheme'
import { createStackNavigator } from '@react-navigation/stack'
import { ROUTERS } from 'utils/routers'

import { Login } from '../screens/public/Login'

import { PublicParamsRoute } from './ParamsRoute'

const Stack = createStackNavigator<PublicParamsRoute>()

export const PublicStacks = () => {
  const background = useTheme('background')

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTERS.LOGIN}
        component={Login}
        options={{
          headerStyle: {
            backgroundColor: background,
          },
          headerShadowVisible: false,
          headerTitle: () => <Logo />,
        }}
      />
    </Stack.Navigator>
  )
}
