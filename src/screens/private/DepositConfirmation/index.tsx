import React from 'react'
import { View } from 'react-native'
import { useToast } from 'react-native-toast-notifications'
import { Button } from '@components/Button'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@hooks/useTheme'
import {
  DepositeConfirmationRouteProps,
  PrivateRouteProps,
} from '@navigator/ParamsRoute'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'
import { createStyles } from 'responsive-react-native'
import { currencyParse } from 'utils/currencyParse'

export const DepositConfirmation = () => {
  const { params } = useRoute<DepositeConfirmationRouteProps>()

  const iconColor = useTheme('text')

  const toast = useToast()

  const value = params?.value

  const { reset } = useNavigation<PrivateRouteProps>()

  const clipboard = async () => {
    await Clipboard.setStringAsync('46.251.352/0001-10')
    toast.show('CNPJ copiado com sucesso')
  }

  return (
    <Screen>
      <Typography variant="LargeBold" color="text" style={styles.title}>
        Confirmado
      </Typography>
      <View style={styles.card}>
        <Typography variant="normalBold" color="white" style={styles.space}>
          Solicitação de depósito criada com sucesso!
        </Typography>

        <Typography variant="normalRegular" color="white">
          Utilize dos dados abaixo para realizar a transferência do valor
          informado.
        </Typography>

        <Typography variant="LargeBold" color="white" style={styles.value}>
          {currencyParse(value)}
        </Typography>

        <Typography variant="normalRegular" color="white">
          Utilize uma conta bancária cujo CPF do titular seja a mesma do usuário
          cadastrado nesta conta Blu Miners! Caso contrário nao conseguiremos
          identificar seu depósito.
        </Typography>
      </View>

      <View style={styles.info}>
        <Typography variant="normalRegular" color="info" style={styles.space}>
          Titular
        </Typography>
        <Typography variant="normalBold" color="text" style={styles.space}>
          Blu Soluções Digitais
        </Typography>
      </View>

      <View style={styles.info}>
        <Typography variant="normalRegular" color="info" style={styles.space}>
          Banco
        </Typography>
        <Typography variant="normalBold" color="text" style={styles.space}>
          Nubank - 260
        </Typography>
      </View>

      <View style={styles.info}>
        <Typography variant="normalRegular" color="info" style={styles.space}>
          Agência
        </Typography>
        <Typography variant="normalBold" color="text" style={styles.space}>
          0001
        </Typography>
      </View>

      <View style={styles.info}>
        <Typography variant="normalRegular" color="info" style={styles.space}>
          Conta Corrente
        </Typography>
        <Typography variant="normalBold" color="text" style={styles.space}>
          73456258-9
        </Typography>
      </View>

      <View style={styles.info}>
        <Typography variant="normalRegular" color="info" style={styles.space}>
          CNPJ
        </Typography>
        <View style={styles.row}>
          <Typography variant="normalBold" color="text" style={styles.space}>
            46.251.352/0001-10
          </Typography>
          <MaterialIcons
            name="content-copy"
            size={20}
            color={iconColor}
            style={{
              alignSelf: 'stretch',
            }}
            onPress={clipboard}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Concluir"
          onPress={() =>
            reset({
              index: 1,
              routes: [{ name: 'Home' }],
            })
          }
        />
      </View>
    </Screen>
  )
}

const styles = createStyles({
  title: {
    marginTop: 60,
  },
  card: {
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 8,
    padding: 16,
    width: '100%',
    backgroundColor: '#0c846cc5',
  },
  value: {
    marginTop: 40,
    marginBottom: 40,
    alignSelf: 'center',
  },
  space: {
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 30,
    marginBottom: 20,
  },
  info: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
})
