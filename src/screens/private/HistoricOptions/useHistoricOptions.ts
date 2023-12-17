import { useTheme } from '@hooks/useTheme'
import {
  HistoricOptionsRouteProps,
  PrivateRouteProps,
} from '@navigator/ParamsRoute'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ROUTERS } from 'utils/routers'

type Props = {
  optionBackgroundColor: string
  iconColor: string
  title: string
  options: { title: string; onPress(): void }[]
}

export const useHistoricOptions = (): Props => {
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

  return {
    optionBackgroundColor,
    iconColor,
    title,
    options,
  }
}
