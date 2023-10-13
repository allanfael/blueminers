import { z } from 'zod'

const withdraw = z
  .number({
    required_error: 'Campo obrigatório',
  })
  .refine(async (val) => Number(val) >= 1, {
    message: 'Valor mínimo $1,00',
  })
  .nullable()

export const withdrawFormSchema = z.object({
  withdraw,
})

export type WithdrawFormType = z.infer<typeof withdrawFormSchema>
