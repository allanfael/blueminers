import { createStore } from 'zustand/vanilla'

import { userStore } from './user'

const store = createStore(() => ({
  userStore,
}))

export const { getState, setState, subscribe } = store
