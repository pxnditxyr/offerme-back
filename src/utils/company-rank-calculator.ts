
export const companyRankCalculator = ( amount: number, currency : string ): number => {
  const EUR_VALUE = 1
  const USD_VALUE = 0.913
  const BS_VALUE  = 0.13
  const EUR_RANK_VALUE = EUR_VALUE / 1000000
  const USD_RANK_VALUE = USD_VALUE / 1000000
  const BS_RANK_VALUE  = BS_VALUE / 1000000
  if ( currency === 'EUR' ) return amount * EUR_RANK_VALUE
  else if ( currency === 'USD' ) return amount * USD_RANK_VALUE
  else return amount * BS_RANK_VALUE
}
