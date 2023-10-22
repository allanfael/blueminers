import React from 'react'
import { Pressable } from 'react-native'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@hooks/useTheme'
import {
  HistoricOptionsRouteProps,
  PrivateRouteProps,
} from '@navigator/ParamsRoute'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createStyles } from 'responsive-react-native'
import { ROUTERS } from 'utils/routers'

export const HistoricOptions = () => {
  const { navigate } = useNavigation<PrivateRouteProps>()
  const { params } = useRoute<HistoricOptionsRouteProps>()

  const optionBackgroundColor = useTheme('input')
  const iconColor = useTheme('text')

  const title = params.type === 'deposit' ? 'Meus Depósitos' : 'Meus Saques'

  const options = [
    {
      title: 'Aprovado',
      onPress: () =>
        navigate(ROUTERS.HISTORIC, { name: params.type, type: 'approved' }),
    },
    {
      title: 'Pendente',
      onPress: () =>
        navigate(ROUTERS.HISTORIC, { name: params.type, type: 'pending' }),
    },
    {
      title: 'Não aprovado',
      onPress: () =>
        navigate(ROUTERS.HISTORIC, { name: params.type, type: 'rejected' }),
    },
  ]

  return (
    <Screen>
      <Typography variant="LargeBold" color="text" style={styles.title}>
        {title}
      </Typography>

      {options.map((item) => (
        <Pressable
          key={item.title}
          style={[
            styles.button,
            {
              backgroundColor: optionBackgroundColor,
            },
          ]}
          onPress={item.onPress}
        >
          <Typography variant="normalBold" color="text">
            {item.title}
          </Typography>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={iconColor}
          />
        </Pressable>
      ))}
    </Screen>
  )
}

const styles = createStyles({
  title: {
    marginBottom: 60,
  },
  button: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
})
