import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { storage } from './storage'

interface UserState {
  token: string | null
  save: (id: string, token: string) => void
  showBalance: boolean
  onShowBalance(value: boolean): void
  logout: () => void
}

export const userStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        showBalance: true,
        onShowBalance: (showBalance) => set(() => ({ showBalance })),
        save: (id, token) => set(() => ({ id, token })),
        logout() {
          set((state) => ({
            ...state,
            token: null,
            showBalance: true,
          }))
        },
      }),
      { name: 'userStore', storage: createJSONStorage(() => storage) },
    ),
  ),
)
