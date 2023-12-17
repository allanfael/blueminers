import { useToast } from 'react-native-toast-notifications'
import { useTheme } from '@hooks/useTheme'
import {
  DepositeConfirmationRouteProps,
  PrivateRouteProps,
} from '@navigator/ParamsRoute'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'

type Props = {
  iconColor: string
  amount: number
  resetStack(): void
  clipboard(): void
}

export const useDepositConfirmation = (): Props => {
  const { params } = useRoute<DepositeConfirmationRouteProps>()

  const iconColor = useTheme('text')

  const toast = useToast()

  const amount = params?.value

  const { reset } = useNavigation<PrivateRouteProps>()

  const clipboard = async () => {
    await Clipboard.setStringAsync('46.251.352/0001-10')
    toast.show('CNPJ copiado com sucesso')
  }

  const resetStack = () => {
    reset({
      index: 1,
      routes: [{ name: 'Home' }],
    })
  }

  return {
    iconColor,
    amount,
    clipboard,
    resetStack,
  }
}
