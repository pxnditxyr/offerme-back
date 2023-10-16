
export const extractPrismaErrors = ( error : any ) : string | undefined => {
  if ( error.code === 'P2002' ) {
    const field = error.meta.target[ 0 ]
    const value = error.meta.target[ 1 ]
    return `The ${ field } ${ value } already exists`
  }
  
  if ( !error.code ) {
    const stackLines = error.stack.split( '\n' )
    let argumentLine = ''

    for ( const line of stackLines ) {
      if ( line.match( /Argument .*/ ) ) {
        argumentLine = line
        break
      }
    }
    return argumentLine
  }
}
