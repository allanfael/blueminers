import moment from 'moment'

export const dateParse = (date: Date | null) => {
  if (!date) return ''

  const year = new Date(date).getFullYear()
  const currentYear = new Date().getFullYear()
  const sameYear = year === currentYear

  if (!sameYear) return moment(date).format('DD/MM/YYYY')

  return moment(date).format('DD/MMM')
}
