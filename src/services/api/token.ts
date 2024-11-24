import { userStore } from '@store/user'

export function getCurrentAccessToken() {
  return userStore.getState().token
}
