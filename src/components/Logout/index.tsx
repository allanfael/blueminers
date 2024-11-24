import React from 'react'
import { Pressable } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@hooks/useTheme'
import { createStyles } from 'responsive-react-native'

import { Typography } from '../Typography'

interface Props {
  onPress(): void
}

export const Logout = ({ onPress }: Props) => {
  const text = useTheme('text')

  return (
    <Pressable style={styles.logout} onPress={onPress}>
      <Typography variant="smallBold" color="text">
        Sair
      </Typography>
      <MaterialIcons
        name="logout"
        size={26}
        color={text}
        style={{
          alignSelf: 'center',
        }}
      />
    </Pressable>
  )
}

const styles = createStyles({
  logout: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingRight: 12,
  },
})
