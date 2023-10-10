import { registerEnumType } from '@nestjs/graphql'

export enum ValidRoles {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

registerEnumType( ValidRoles, { name: 'ValidRoles' } )
