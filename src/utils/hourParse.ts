import moment from 'moment'

export const hoursParse = (date: Date | null) => {
  if (!date) return ''

  return moment(date).format('DD/MM/YYYY  HH:mm:ss')
}
