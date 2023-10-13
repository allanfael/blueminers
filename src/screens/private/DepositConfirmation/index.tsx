import React from 'react'
import { View } from 'react-native'
import { Button } from '@components/Button'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { DepositeConfirmationRouteProps } from '@navigator/ParamsRoute'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createStyles } from 'responsive-react-native'
import { currencyParse } from 'utils/currencyParse'

export const DepositConfirmation = () => {
  const { params } = useRoute<DepositeConfirmationRouteProps>()

  const value = params?.value

  const { reset } = useNavigation()

  return (
    <Screen>
      <Typography variant="LargeBold" color="#000">
        Confirmado
      </Typography>
      <View style={styles.card}>
        <Typography variant="normalBold" color="#fff" style={styles.space}>
          Solicitação de depósito criada com sucesso!
        </Typography>

        <Typography variant="normalRegular" color="#fff">
          Utilize dos dados abaixo para realizar a transferência do valor
          informado.
        </Typography>

        <Typography variant="LargeBold" color="#fff" style={styles.value}>
          {currencyParse(value)}
        </Typography>

        <Typography variant="normalRegular" color="#fff">
          Utilize uma conta bancária cujo CPF do titular seja a mesma do usuário
          cadastrado nesta conta Blu Miners! Caso contrário nao conseguiremos
          identificar seu depósito.
        </Typography>
      </View>

      <View style={styles.info}>
        <Typography variant="normalRegular" color="#666" style={styles.space}>
          Titular
        </Typography>
        <Typography variant="normalBold" color="#666" style={styles.space}>
          Blu Soluções Digitais
        </Typography>
      </View>

      <View style={styles.info}>
        <Typography variant="normalRegular" color="#666" style={styles.space}>
          Banco
        </Typography>
        <Typography variant="normalBold" color="#666" style={styles.space}>
          Nubank - 260
        </Typography>
      </View>

      <View style={styles.info}>
        <Typography variant="normalRegular" color="#666" style={styles.space}>
          Agência
        </Typography>
        <Typography variant="normalBold" color="#666" style={styles.space}>
          0001
        </Typography>
      </View>

      <View style={styles.info}>
        <Typography variant="normalRegular" color="#666" style={styles.space}>
          Conta Corrente
        </Typography>
        <Typography variant="normalBold" color="#666" style={styles.space}>
          73456258-9
        </Typography>
      </View>

      <View style={styles.info}>
        <Typography variant="normalRegular" color="#666" style={styles.space}>
          CNPJ
        </Typography>
        <Typography variant="normalBold" color="#666" style={styles.space}>
          46.251.352/0001-10
        </Typography>
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
    marginBottom: 20,
  },
  info: {
    marginBottom: 12,
  },
})
