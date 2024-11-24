import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { render, screen } from '@testing-library/react-native'

import { useLogin } from './useLogin'
import { Login } from '.'

jest.mock('./useLogin', () => ({
  useLogin: jest.fn(),
}))

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = ({ children }: any) => {
    return <>{children}</>
  }
  return { KeyboardAwareScrollView }
})

jest.mock('../../../store/user', () => ({
  userStore: {
    save: jest.fn(),
  },
}))

describe('<Login />', () => {
  it('should render Login correctly', async () => {
    ;(useLogin as jest.MockedFunction<typeof useLogin>).mockReturnValue({
      onSubmit: jest.fn(),
      form: {
        formState: {
          isSubmitting: false,
          errors: {
            email: {
              message: '',
            },
            password: {
              message: '',
            },
          },
        } as any,
        handleSubmit: jest.fn(),
      } as any,
    })

    render(<Login />)

    expect(screen.toJSON()).toMatchSnapshot()
  })

  it('should render with email and password correctly', async () => {
    ;(useLogin as jest.MockedFunction<typeof useLogin>).mockReturnValue({
      onSubmit: jest.fn(),
      form: {
        formState: {
          isSubmitting: false,
          errors: {
            email: {
              message: '',
            },
            password: {
              message: '',
            },
          },
        },
        handleSubmit: jest.fn(),
      } as any,
    })

    const methods = useForm({
      defaultValues: { email: '', password: '' },
    })

    methods.setValue('email', 'test@email')
    methods.setValue('password', '123123')

    render(
      <FormProvider {...methods}>
        <Login />
      </FormProvider>,
    )

    const email = await screen.getByTestId('login-email')
    const password = await screen.getByTestId('login-password')

    expect(email.props.value).toBe('test@email')
    expect(password.props.value).toBe('123123')
  })

  it('should render submit button disabled', async () => {
    ;(useLogin as jest.MockedFunction<typeof useLogin>).mockReturnValue({
      onSubmit: jest.fn(),
      form: {
        formState: {
          isSubmitting: true,
          errors: {
            email: {
              message: '',
            },
            password: {
              message: '',
            },
          },
        },
        handleSubmit: jest.fn(),
      } as any,
    })

    const methods = useForm({
      defaultValues: { email: '', password: '' },
    })

    methods.setValue('email', 'test@email')
    methods.setValue('password', '123123')

    render(
      <FormProvider {...methods}>
        <Login />
      </FormProvider>,
    )

    const button = await screen.findByTestId('login-button')

    expect(button.props.enabled).toBeFalsy()
  })
})
