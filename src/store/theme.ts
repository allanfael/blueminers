import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { storage } from './storage'

interface ThemeState {
  theme: 'DARK' | 'LIGHT'
  save(theme: 'DARK' | 'LIGHT'): void
}

export const themeStore = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'LIGHT',
        save(theme) {
          set(() => ({
            theme,
          }))
        },
      }),
      { name: 'userStore', storage: createJSONStorage(() => storage) },
    ),
  ),
)
