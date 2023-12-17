import { create } from 'zustand'

export type Account = {
  id: string | null
  user: string | null
  currentBalance: number | null
  accumulatedGain: number | null
  available: number | null
  brokerGain: number | null
  lastIncome: number | null
  lastUpdate: Date | null
  incomePercent: number | null
  blucoinBalance: number | null
  pendingWithdraw: number
}

interface AccountState {
  account: Account
  save: (account: Account) => void
  update: (account: Account) => void
  clean: () => void
}

export const initialState: Account = {
  user: null,
  id: null,
  currentBalance: null,
  accumulatedGain: null,
  available: null,
  brokerGain: null,
  lastIncome: null,
  incomePercent: null,
  lastUpdate: null,
  blucoinBalance: null,
  pendingWithdraw: 0,
}

export const useAccountStore = create<AccountState>()((set) => ({
  account: initialState,
  save(account) {
    set(() => ({
      account,
    }))
  },
  update(data) {
    set((state) => ({
      account: {
        ...state.account,
        ...data,
      },
    }))
  },
  clean() {
    set(() => ({
      account: initialState,
    }))
  },
}))
