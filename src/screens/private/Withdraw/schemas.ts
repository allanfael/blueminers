import { z } from 'zod'

const withdraw = z
  .number({
    required_error: 'Campo obrigatório',
  })
  .refine(async (val) => Number(val) >= 5, {
    message: 'Valor mínimo R$5,00',
  })
  .nullable()

export const withdrawFormSchema = z.object({
  withdraw,
})

export type WithdrawFormType = z.infer<typeof withdrawFormSchema>
