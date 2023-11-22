interface IGenerateDiscountCodeParams {
  quantity: number
  existingCodes: string[]
}

export const generateDiscountCodes = ( { quantity, existingCodes } : IGenerateDiscountCodeParams ) => {
  const codes : string[] = []
  for ( let i = 0; i < quantity; i++ ) {
    const code = generateDiscountCode( existingCodes )
    codes.push( code.toUpperCase() )
    existingCodes.push( code )
  }
  return codes
}

const generateDiscountCode = ( existingCodes : string[] ) : string => {
  const code = generateRandomString()
  if ( existingCodes.includes( code ) ) {
    return generateDiscountCode( existingCodes )
  }
  return code
}

const generateRandomString = () : string => {
  return Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 )
}


