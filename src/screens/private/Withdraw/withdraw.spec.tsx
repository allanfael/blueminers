import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { render, screen } from '@testing-library/react-native'

import { useWithdraw } from './useWithdraw'
import { Withdraw } from '.'

jest.mock('./useWithdraw', () => ({
  useWithdraw: jest.fn(),
}))

jest.mock('../../../store/account', () => ({
  useAccountStore: {
    account: {
      id: '123',
      available: 100,
    },
  },
}))

describe('<Withdraw />', () => {
  it('should render Withdraw correctly', async () => {
    ;(useWithdraw as jest.MockedFunction<typeof useWithdraw>).mockReturnValue({
      onSubmit: jest.fn(),
      onMax: jest.fn(),
      account: {
        id: '123',
        available: 100,
      } as any,
    })

    render(<Withdraw />)

    expect(screen.toJSON()).toMatchSnapshot()
  })

  it('should show minimum value of withdraw', async () => {
    ;(useWithdraw as jest.MockedFunction<typeof useWithdraw>).mockReturnValue({
      onSubmit: jest.fn(),
      onMax: jest.fn(),
      account: {
        id: '123',
        available: 100,
      } as any,
    })

    const methods = useForm({
      defaultValues: { withdraw: '' },
    })

    methods.setError('withdraw', {
      message: 'Valor mínimo R$5,00',
    })

    render(
      <FormProvider {...methods}>
        <Withdraw />
      </FormProvider>,
    )

    const message = 'Valor mínimo R$5,00'

    expect(screen.getByText(message)).toBeDefined()
  })
})

// it('should render with email and password correctly', async () => {
//   ;(useLogin as jest.MockedFunction<typeof useLogin>).mockReturnValue({
//     onSubmit: jest.fn(),
//     form: {
//       formState: {
//         isSubmitting: false,
//         errors: {
//           email: {
//             message: '',
//           },
//           password: {
//             message: '',
//           },
//         },
//       },
//       handleSubmit: jest.fn(),
//     } as any,
//   })

//   const methods = useForm({
//     defaultValues: { email: '', password: '' },
//   })

//   methods.setValue('email', 'test@email')
//   methods.setValue('password', '123123')

//   render(
//     <FormProvider {...methods}>
//       <Login />
//     </FormProvider>,
//   )

//   const email = await screen.getByTestId('login-email')
//   const password = await screen.getByTestId('login-password')

//   expect(email.props.value).toBe('test@email')
//   expect(password.props.value).toBe('123123')
// })

// it('should render submit button disabled', async () => {
//   ;(useLogin as jest.MockedFunction<typeof useLogin>).mockReturnValue({
//     onSubmit: jest.fn(),
//     form: {
//       formState: {
//         isSubmitting: true,
//         errors: {
//           email: {
//             message: '',
//           },
//           password: {
//             message: '',
//           },
//         },
//       },
//       handleSubmit: jest.fn(),
//     } as any,
//   })

//   const methods = useForm({
//     defaultValues: { email: '', password: '' },
//   })

//   methods.setValue('email', 'test@email')
//   methods.setValue('password', '123123')

//   render(
//     <FormProvider {...methods}>
//       <Login />
//     </FormProvider>,
//   )

//   const button = await screen.findByTestId('login-button')

//   expect(button.props.enabled).toBeFalsy()
// })
