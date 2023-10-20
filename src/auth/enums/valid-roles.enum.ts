import { registerEnumType } from '@nestjs/graphql'

export enum ValidRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SELLER = 'SELLER',
  COMPANY_REPRESENTATIVE = 'COMPANY_REPRESENTATIVE',
}

registerEnumType( ValidRoles, { name: 'ValidRoles' } )
