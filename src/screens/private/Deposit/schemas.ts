import { z } from 'zod'

const deposit = z
  .number({
    required_error: 'Campo obrigatório',
  })
  .min(7, 'Valor mínimo $10,00')
  .nullable()

export const depositFormSchema = z.object({
  deposit,
})

export type DepositFormType = z.infer<typeof depositFormSchema>
