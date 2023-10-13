import AsyncStorage from '@react-native-async-storage/async-storage' // can use anything: IndexedDB, Ionic Storage, etc.
import { StateStorage } from 'zustand/middleware'

// Custom storage object
export const storage: StateStorage = {
  getItem: async (key: string): Promise<string | null> => {
    return await AsyncStorage.getItem(key)
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(key, value)
  },
  removeItem: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key)
  },
}
