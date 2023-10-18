
export const extractPrismaExceptions = ( error : any ) : string | undefined => {
  if ( error.code === 'P2002' ) {
    return error.meta.target.map( ( field : string ) =>
      `The ${ field } is already in use` ).join( ', ' )
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
    argumentLine = argumentLine.replace( 'contains', 'search' )
    argumentLine = argumentLine.replace( 'take', 'limit' )
    argumentLine = argumentLine.replace( 'skip', 'offset' )
    return argumentLine
  }
}
