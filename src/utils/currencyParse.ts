function roundUsing(
  func: (value: number) => number,
  number: number,
  prec: number,
): number {
  let tempnumber = number * Math.pow(10, prec)
  tempnumber = func(tempnumber)
  return tempnumber / Math.pow(10, prec)
}

export const currencyParse = (value: number | null): string => {
  if (!value) return 'Saldo indisponível'

  const parse = roundUsing(Math.floor, value, 2)

  const currency = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
  })

  const formatted = `${currency.format(parse)}`

  return formatted
}
