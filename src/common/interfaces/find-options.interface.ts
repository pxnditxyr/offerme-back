import { User } from 'src/users/users/entities/user.entity'
import { PaginationArgs, SearchArgs } from '../dto/args'

export interface findAllOptions {
  owner?: User
  paginationArgs: PaginationArgs
  searchArgs: SearchArgs
}
