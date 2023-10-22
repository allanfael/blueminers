import { useColorScheme } from 'react-native'
import { colors } from '@themes/colors'

type ColorProps = keyof typeof colors.light

export const useTheme = (color: ColorProps) => {
  const theme = useColorScheme() ?? 'light'
  return colors[theme][color]
}
