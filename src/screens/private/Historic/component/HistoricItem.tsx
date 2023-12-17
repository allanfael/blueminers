import React from 'react'
import { View } from 'react-native'
import { Typography } from '@components/Typography'
import { colors } from '@themes/colors'
import { createStyles } from 'responsive-react-native'
import { currencyParse } from 'utils/currencyParse'
import { dateParse } from 'utils/dateParse'

import { HistoricListType } from '..'

interface ItemProps extends HistoricListType {
  description: string
}

export const HistoricItem = (item: ItemProps) => (
  <View
    style={[
      styles.item,
      {
        borderBottomColor: colors.dark.info,
      },
    ]}
  >
    <Typography variant="normalRegular" color="info">
      {item.description}
    </Typography>

    <View style={styles.row}>
      <Typography variant="normalBold" color="text">
        {currencyParse(item.value)}
      </Typography>
      <Typography variant="normalRegular" color="info">
        {dateParse(item.date)}
      </Typography>
    </View>
  </View>
)

const styles = createStyles({
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  item: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 20,
    borderBottomWidth: 1,
  },
})
