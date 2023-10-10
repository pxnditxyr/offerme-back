import { ExecutionContext, ForbiddenException, InternalServerErrorException, createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ValidRoles } from '../enums/valid-roles.enum'

export const CurrentUser = createParamDecorator(
  ( roles : ValidRoles[] = [], context: ExecutionContext ) => {
    const ctx = GqlExecutionContext.create( context )
    const { user } = ctx.getContext().req
    if ( !user ) throw new InternalServerErrorException( 'No user inside request make sure you are using AuthGuard' )

    if ( roles.length === 0 ) return user

    if ( roles.includes( user.role.name ) ) return user

    throw new ForbiddenException( 'You do not have permission to access this resource' )
  }

)

