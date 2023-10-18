import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from '@components/Button'
import { Input } from '@components/Input'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { zodResolver } from '@hookform/resolvers/zod'
import { post } from '@services/api'
import ResponseError from '@services/api/ResponseError'
import { userStore } from '@store/user'
import { createStyles } from 'responsive-react-native'

import { authenticationFormSchema, AuthenticationFormType } from './schemas'

export const Login = () => {
  const { save } = userStore()

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AuthenticationFormType>({
    resolver: zodResolver(authenticationFormSchema),
  })

  const onSubmit = async (data: AuthenticationFormType) => {
    try {
      const response = await post({
        url: '/api/user/signin',
        data,
      })

      const id = response.roles[0]._id
      const token = response.token

      save(id, token)
    } catch (e) {
      if (e instanceof ResponseError) {
        setError('password', {
          message: e.message as string,
        })
      }
    }
  }

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
          control={control}
          rules={{
            required: true,
          }}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input
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
          control={control}
          rules={{
            required: true,
          }}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input
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
