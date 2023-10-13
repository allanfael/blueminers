import { userStore } from '@store/user'

export function getCurrentAccessToken() {
  return userStore.getState().token
}

export function getCurrentRefreshToken() {
  // this is how you access the zustand store outside of React.
  // return useAuthStore.getState().refreshToken
}

async function logout() {
  console.log('logout...')
}
