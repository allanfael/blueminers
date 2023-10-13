import { z } from 'zod'

const email = z
  .string({
    required_error: 'O e-mail é obrigatório',
  })
  .email('Preencha com formato de e-mail válido')

export const authenticationFormSchema = z.object({
  email,
  password: z.string({
    required_error: 'A senha é obrigatória',
  }),
})

export type AuthenticationFormType = z.infer<typeof authenticationFormSchema>
