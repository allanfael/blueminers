import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { post } from '@services/api'
import ResponseError from '@services/api/ResponseError'
import { userStore } from '@store/user'

import { authenticationFormSchema, AuthenticationFormType } from './schemas'

interface Props {
  form: UseFormReturn<AuthenticationFormType, any, any>
  onSubmit: (data: AuthenticationFormType) => Promise<void>
}

export const useLogin = (): Props => {
  const { save } = userStore()

  const form = useForm<AuthenticationFormType>({
    resolver: zodResolver(authenticationFormSchema),
  })

  const { setError } = form

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

  return {
    form,
    onSubmit,
  }
}
