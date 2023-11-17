import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateParameterInput, UpdateParameterInput } from './dto/inputs'
import { Parameter } from '../parameters/entities/parameter.entity'
import { PrismaService } from '../../prisma'
import { isUUID } from 'class-validator'
import { User } from 'src/users/users/entities/user.entity'
import { IFindAllOptions } from 'src/common/interfaces'

const parameterIncludes = {
  subparameters: true,
  creator: true,
  updater: true,
}

@Injectable()
export class ParametersService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create( createParameterInput : CreateParameterInput, creator? : User ) : Promise<Parameter> {
    try {
      const parameter = await this.prismaService.parameters.create({
        data: {
          ...createParameterInput,
          createdBy: creator?.id
        }
      })
      return parameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll( { searchArgs, paginationArgs } : IFindAllOptions ) {
    const { limit, offset } = paginationArgs
    const { search, status } = searchArgs
    // TODO: don't return parameters with status false
    const parameters = await this.prismaService.parameters.findMany({
      include: { ...parameterIncludes },
      where: {
        status: status ?? undefined,
        name: { contains: search ?? '' }
      },
      take: limit ?? undefined,
      skip: offset ?? undefined
    })
    return parameters
  }

  async findOne ( term : string ) {
    // TODO: don't return parameters with status false
    if ( isUUID( term ) ) {
      const parameter = await this.prismaService.parameters.findUnique({
        where: { id: term },
        include: { ...parameterIncludes }
      })
      if ( !parameter ) throw new NotFoundException( `Parameter ${ term } not found` )
      return parameter
    }
    const parameter = await this.prismaService.parameters.findUnique({
      where: { name: term },
      include: { ...parameterIncludes }
    })
    if ( !parameter ) throw new NotFoundException( `Parameter ${ term } not found` )
    return parameter
  }

  async update( id : string, updateParameterInput : UpdateParameterInput, updater : User ) {
    await this.findOne( id )
    try {
      const parameter = await this.prismaService.parameters.update({
        where: { id },
        data: {
          ...updateParameterInput,
          updatedBy: updater.id
        }
      })
      return parameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) {
    await this.findOne( id )
    try {
      const parameter = await this.prismaService.parameters.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return parameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }
  
  private handlerDBExceptions ( error : any ) : never {
    if ( error.code === 'P2002' ) {
      throw new BadRequestException(
        error.meta.target.map( ( field : string ) =>
          `The ${ field } is already in use` ).join( ', ' )
      )
    }
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
