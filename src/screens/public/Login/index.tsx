import React from 'react'
import { Controller } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { createStyles } from 'responsive-react-native'

import { useLogin } from './useLogin'

export const Login = () => {
  const { form, onSubmit } = useLogin()

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
  } = form

  return (
    <Screen>
      <KeyboardAwareScrollView>
        <Typography variant="LargeMedium" color="text">
          Bem vindo
        </Typography>
        <Typography variant="normalMedium" color="info">
          Entre para continuar
        </Typography>

        <Controller
          control={form.control}
          rules={{
            required: true,
          }}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
              testID="login-email"
              label="E-mail"
              containerStyle={styles.email}
              placeholder="Digite seu e-mail"
              textContentType="emailAddress"
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          rules={{
            required: true,
          }}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
              testID="login-password"
              label="Senha"
              containerStyle={styles.input}
              placeholder="Digite sua senha"
              error={errors.password?.message}
              value={value}
              onChangeText={onChange}
              secureTextEntry
              onSubmitEditing={handleSubmit(onSubmit)}
              returnKeyType="go"
              returnKeyLabel="Entrar"
            />
          )}
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          title="Entrar"
          styles={styles.button}
          loading={isSubmitting}
          testID="login-button"
        />
      </KeyboardAwareScrollView>
    </Screen>
  )
}

const styles = createStyles({
  email: {
    marginTop: 80,
  },
  input: {
    marginTop: 30,
  },
  button: {
    marginTop: 60,
  },
})
