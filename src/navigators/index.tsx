import React from 'react'
import { useTheme } from '@hooks/useTheme'
import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { userStore } from '@store/user'

import { PrivateStacks } from './PrivateStack'
import { PublicStacks } from './PublicStack'

const MainStack = createStackNavigator()

export const RootNavigation = () => {
  const { token } = userStore()
  const backgroundColor = useTheme('background')

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: backgroundColor,
    },
  }

  return (
    <NavigationContainer theme={CustomDefaultTheme}>
      <MainStack.Navigator>
        {token ? (
          <MainStack.Screen
            name="PrivateStacks"
            component={PrivateStacks}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <MainStack.Screen
            name="PublicStacks"
            component={PublicStacks}
            options={{
              headerShown: false,
            }}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  )
}
