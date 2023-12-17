import React from 'react'
import { Pressable } from 'react-native'
import { Screen } from '@components/Screen'
import { Typography } from '@components/Typography'
import { MaterialIcons } from '@expo/vector-icons'
import { createStyles } from 'responsive-react-native'

import { useHistoricOptions } from './useHistoricOptions'

export const HistoricOptions = () => {
  const { optionBackgroundColor, iconColor, title, options } =
    useHistoricOptions()

  return (
    <Screen>
      <Typography variant="LargeBold" color="text" style={styles.title}>
        {title}
      </Typography>

      {options.map((item) => (
        <Pressable
          key={item.title}
          style={[
            styles.button,
            {
              backgroundColor: optionBackgroundColor,
            },
          ]}
          onPress={item.onPress}
        >
          <Typography variant="normalBold" color="text">
            {item.title}
          </Typography>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color={iconColor}
          />
        </Pressable>
      ))}
    </Screen>
  )
}

const styles = createStyles({
  title: {
    marginBottom: 60,
  },
  button: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
})
