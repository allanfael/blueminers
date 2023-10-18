import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, useColorScheme, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Typography } from '@components/Typography'
import { HistoricRouteProps } from '@navigator/ParamsRoute'
import { useRoute } from '@react-navigation/native'
import { get } from '@services/api'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { colors } from '@themes/colors'
import { createStyles } from 'responsive-react-native'
import { currencyParse } from 'utils/currencyParse'
import { dateParse } from 'utils/dateParse'

import { HistoricListType } from './historicListType'

interface ItemProps extends HistoricListType {
  borderColor: string
  description: string
}

const Item = (item: ItemProps) => (
  <View
    key={item.id}
    style={[
      styles.item,
      {
        borderBottomColor: item.borderColor,
      },
    ]}
  >
    <Typography variant="normalMedium" color="info">
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

export const Historic = () => {
  const { params } = useRoute<HistoricRouteProps>()
  const [list, setList] = useState<HistoricListType[]>()
  const theme = useColorScheme() ?? 'light'
  const [loading, setLoading] = useState(false)

  const { bottom } = useSafeAreaInsets()
  const paddingBottom = (bottom + 20) as number

  const separatorColor = colors[theme].info

  const title = 'Histórico'

  const depositDescriptionStatus = {
    approved: 'Transferência enviada',
    pending: 'Transferência pendente',
    rejected: 'Transferência rejeitada',
  }

  const withdrawDepositDescriptionStatus = {
    approved: 'Transferência recebida',
    pending: 'Transferência pendente',
    rejected: 'Transferência rejeitada',
  }

  const description =
    params.name === 'withdraw'
      ? withdrawDepositDescriptionStatus[params.type]
      : depositDescriptionStatus[params.type]

  const fetch = useCallback(async () => {
    const name = params.name === 'withdraw' ? 'withdrawals' : 'deposits'
    const type = params.type

    try {
      setLoading(true)

      const response: any[] = await get({
        url: '/api/user/account/history',
      })

      const data = response[name][type].map((item: any) => ({
        id: item._id,
        value: item.value,
        date: item.createdAt,
      }))

      setList(data)
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }, [params.name, params.type])

  useEffect(() => {
    fetch()
  }, [fetch])

  const HeaderComponent = () => (
    <View>
      <Typography variant="LargeBold" color="text" style={styles.title}>
        {title}
      </Typography>
      {loading && (
        <ActivityIndicator size="small" color="gray" style={styles.loading} />
      )}
    </View>
  )

  const ListEmptyComponent = () => (
    <View style={styles.empty}>
      {!loading && (
        <Typography variant="normalMedium" color="info">
          Nenhuma transferência encontrada
        </Typography>
      )}
    </View>
  )

  const renderItem: ListRenderItem<HistoricListType> = ({ item }) => (
    <Item
      value={item.value}
      date={item.date}
      id={item.id}
      borderColor={separatorColor}
      description={description}
    />
  )

  return (
    <FlashList
      data={list}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={HeaderComponent}
      renderItem={renderItem}
      contentContainerStyle={[
        styles.container,
        {
          paddingBottom,
        },
      ]}
      ListEmptyComponent={ListEmptyComponent}
      estimatedItemSize={500}
    />
  )
}

const styles = createStyles({
  title: {
    marginBottom: 20,
    paddingLeft: 20,
    marginTop: 20,
  },
  container: {
    flexGrow: 1,
  },
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
    gap: 10,
    borderBottomWidth: 1,
  },
  loading: {
    marginTop: 20,
    alignSelf: 'center',
  },
  empty: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
})
