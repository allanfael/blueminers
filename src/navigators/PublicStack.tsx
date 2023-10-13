import React from 'react'
import { Image, useColorScheme } from 'react-native'
import { logo } from '@assets/index'
import { createStackNavigator } from '@react-navigation/stack'
import { colors } from '@themes/colors'
import { createStyles } from 'responsive-react-native'
import { ROUTERS } from 'utils/routers'

import { Login } from '../screens/public/Login'

import { PublicParamsRoute } from './ParamsRoute'

const Stack = createStackNavigator<PublicParamsRoute>()

export const PublicStacks = () => {
  const scheme = useColorScheme()

  const background =
    scheme === 'dark' ? colors.dark.background : colors.light.background

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
          headerTitle: () => (
            <Image
              source={logo}
              resizeMode="contain"
              alt=""
              style={styles.image}
            />
          ),
        }}
      />
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
