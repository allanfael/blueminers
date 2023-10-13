import React from 'react'
import { ScrollView, ScrollViewProps, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { createStyles } from 'responsive-react-native'

interface Props extends ScrollViewProps {
  children: React.ReactNode
  style?: ViewStyle
}

export const Screen = ({ children, style, ...props }: Props) => {
  const { bottom } = useSafeAreaInsets()
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        style,
        styles.scrollView,
        {
          paddingBottom: bottom,
          paddingRight: 30,
          paddingLeft: 30,
          paddingTop: 20,
        },
      ]}
      {...props}
    >
      {children}
    </ScrollView>
  )
}

const styles = createStyles({
  scrollView: {
    flexGrow: 1,
  },
})
