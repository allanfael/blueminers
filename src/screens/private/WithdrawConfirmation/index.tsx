import React from 'react'
import { View } from 'react-native'
import { Button } from '@components/Button'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { WithdrawConfirmationRouteProps } from '@navigator/ParamsRoute'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createStyles } from 'responsive-react-native'
import { currencyParse } from 'utils/currencyParse'

export const WithdrawConfirmation = () => {
  const { params } = useRoute<WithdrawConfirmationRouteProps>()

  const value = params?.value

  const { reset } = useNavigation()

  return (
    <Screen>
      <Typography variant="LargeBold" color="text">
        Confirmado
      </Typography>
      <View style={styles.card}>
        <Typography
          variant="normalBold"
          color="textButton"
          style={styles.space}
        >
          Solicitação de saque criada com sucesso!
        </Typography>

        <Typography variant="LargeBold" color="textButton" style={styles.value}>
          {currencyParse(value)}
        </Typography>

        <Typography variant="normalRegular" color="textButton">
          A transferência será enviada para sua conta bancária vinculada à chave
          pix que está cadastrada nesta conta Blu Miners.
        </Typography>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Concluir"
          styles={styles.button}
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
  button: {
    marginTop: 40,
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
