import React from 'react'
import { initialState } from '@store/account'
import { render, screen } from '@testing-library/react-native'

import { Balance } from './components/Balance'
import { mockHome } from './mock'
import { useHome, UseHomeProps } from './useHome'
import { Home } from '.'

jest.mock('./useHome', () => ({
  useHome: jest.fn(),
}))

describe('<Home />', () => {
  it('should render Home correctly', async () => {
    ;(useHome as jest.MockedFunction<typeof useHome>).mockReturnValue({
      loading: false,
      error: '',
      refresh: false,
      update: jest.fn(),
      depositNavigation: jest.fn(),
      withdrawNavigation: jest.fn(),
      depositHistoricNavigation: jest.fn(),
      withdrawHistoricNavigation: jest.fn(),
      clipboard: jest.fn(),
      account: initialState,
      showBalance: false,
      onShowBalance: jest.fn(),
    } as UseHomeProps)

    render(<Home />)

    expect(screen.toJSON()).toMatchSnapshot()
  })

  it('should render Home with values correctly', async () => {
    ;(useHome as jest.MockedFunction<typeof useHome>).mockReturnValue({
      loading: false,
      error: '',
      refresh: false,
      update: jest.fn(),
      depositNavigation: jest.fn(),
      withdrawNavigation: jest.fn(),
      depositHistoricNavigation: jest.fn(),
      withdrawHistoricNavigation: jest.fn(),
      clipboard: jest.fn(),
      account: mockHome,
      showBalance: false,
      onShowBalance: jest.fn(),
    } as UseHomeProps)

    render(<Home />)

    expect(screen.toJSON()).toMatchSnapshot()
  })

  it('should render Balance component without show balance value', async () => {
    const { getByText } = render(
      <Balance
        account={mockHome}
        showBalance={false}
        onShowBalance={jest.fn()}
        clipboard={jest.fn()}
        depositNavigation={jest.fn()}
      />,
    )

    const currentBalance = await getByText('****')

    expect(currentBalance).toBeDefined()
  })
})
