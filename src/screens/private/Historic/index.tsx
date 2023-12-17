import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Typography } from '@components/Typography'
import { HistoricRouteProps } from '@navigator/ParamsRoute'
import { useRoute } from '@react-navigation/native'
import { api } from '@services/api/api'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { createStyles } from 'responsive-react-native'

import { HistoricItem } from './component/HistoricItem'

export type HistoricListType = {
  value: number
  date: Date
  id: string
}

export const Historic = () => {
  const { params } = useRoute<HistoricRouteProps>()
  const [list, setList] = useState<HistoricListType[]>()
  const [loading, setLoading] = useState(false)

  const { bottom } = useSafeAreaInsets()
  const paddingBottom = (bottom + 20)! as number

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

      const response: any[] = await api.historic()

      const data = response[name as unknown as number][type].map(
        (item: any) => ({
          id: item._id,
          value: item.value,
          date: item.createdAt,
        }),
      )

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
    <HistoricItem
      value={item.value}
      date={item.date}
      id={item.id}
      description={description}
    />
  )

  return (
    <FlashList
      data={list}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={HeaderComponent}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingBottom,
      }}
      style={styles.container}
      ListEmptyComponent={ListEmptyComponent}
      estimatedItemSize={200}
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
