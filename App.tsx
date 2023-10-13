import { useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ToastOptions, ToastProvider } from 'react-native-toast-notifications'
import {
  Muli_400Regular,
  Muli_600SemiBold,
  Muli_700Bold,
} from '@expo-google-fonts/muli'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import moment from 'moment'

import 'react-native-gesture-handler'
import 'moment/locale/pt-br'

import { RootNavigation } from './src/navigators'

const toastCustomization: ToastOptions = {
  placement: 'bottom',
  duration: 3000,
  successColor: '#0c7c65',
}

export default function App() {
  moment.locale('pt-br')

  const [fontsLoaded] = useFonts({
    Muli_400Regular,
    Muli_600SemiBold,
    Muli_700Bold,
  })

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])

  if (!fontsLoaded) {
    return null
  }

  onLayoutRootView()

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="red" />
      <ToastProvider {...toastCustomization}>
        <RootNavigation />
      </ToastProvider>
    </SafeAreaProvider>
  )
}
