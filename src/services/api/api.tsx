import { Account } from '@store/account'

import { get, post } from '.'

export interface DepositProps {
  account_id: string | null
  currency: 'BRL'
  value: number | null
  used_quotation: number
}

export interface WithdrawProps {
  account_id: string | null
  currency: 'BRL'
  value: number | null
}

export const api = {
  home: async (): Promise<Account> => {
    const response: any = await get({
      url: '/api/user/account/retrieve',
    })

    const data: Account = {
      id: response.account._id,
      user: response.account.user,
      currentBalance: response.account.balance,
      accumulatedGain: response.account.acc_gain,
      available: response.account.available,
      brokerGain: response.account.broker_gain,
      lastIncome: response.account.last_income,
      incomePercent: response.lastIncome.income,
      lastUpdate: response.lastIncome.updatedAt,
      blucoinBalance: response.account.blucoin_balance,
    }

    return data
  },
  historic: async (): Promise<any[]> => {
    const response: any[] = await get({
      url: '/api/user/account/history',
    })

    return response
  },
  deposit: async (data: DepositProps): Promise<void> => {
    await post({
      url: '/api/user/account/deposit',
      data,
    })
  },
  withdraw: async (data: WithdrawProps): Promise<void> => {
    await post({
      url: '/api/user/account/withdraw',
      data,
    })
  },
}
