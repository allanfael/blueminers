import React from 'react'
import { Pressable, View } from 'react-native'
import { Typography } from '@components/Typography'
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from '@hooks/useTheme'
import { createStyles } from 'responsive-react-native'

interface Props {
  withdrawHistoricNavigation(): void
  depositHistoricNavigation(): void
}

export const Historic = ({
  withdrawHistoricNavigation,
  depositHistoricNavigation,
}: Props) => {
  const iconColor = useTheme('text')
  const optionBackgroundColor = useTheme('input')

  const options = [
    {
      label: 'Saques',
      icon: (
        <MaterialIcons
          name="vertical-align-bottom"
          size={24}
          color={iconColor}
        />
      ),
      onPress: () => withdrawHistoricNavigation(),
    },
    {
      label: 'Depósitos',
      icon: (
        <MaterialIcons name="vertical-align-top" size={24} color={iconColor} />
      ),
      onPress: () => depositHistoricNavigation(),
    },
  ]

  return (
    <View>
      <Typography variant="LargeBold" color="text" style={styles.title}>
        Histórico
      </Typography>

      <View style={[styles.row, styles.top]}>
        {options.map((item) => (
          <Pressable
            key={item.label}
            style={styles.optionContainer}
            onPress={item.onPress}
          >
            <View
              style={[
                styles.circle,
                {
                  backgroundColor: optionBackgroundColor,
                },
              ]}
            >
              {item.icon}
            </View>
            <Typography variant="normalBold" color="text">
              {item.label}
            </Typography>
          </Pressable>
        ))}
      </View>
    </View>
  )
}

const styles = createStyles({
  title: { marginTop: 40 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },

  top: {
    marginTop: 20,
  },
  circle: {
    width: 66,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 33,
    marginBottom: 10,
  },
  optionContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
})
