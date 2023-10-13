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
}

interface AccountState {
  account: Account
  save: (account: Account) => void
  update: (account: Account) => void
  clean: () => void
}

const initialState: Account = {
  user: null,
  id: null,
  currentBalance: null,
  accumulatedGain: null,
  available: null,
  brokerGain: null,
  lastIncome: null,
  incomePercent: null,
  lastUpdate: null,
}

export const useAccountStore = create<AccountState>()((set) => ({
  account: initialState,
  save(account) {
    set(() => ({
      account,
    }))
  },
  update(account) {
    set((state) => ({
      ...state,
      ...account,
    }))
  },
  clean() {
    set(() => ({
      account: initialState,
    }))
  },
}))
