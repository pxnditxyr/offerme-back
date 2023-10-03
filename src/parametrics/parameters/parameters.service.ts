import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateParameterInput, UpdateParameterInput } from './dto/inputs'
import { Parameter } from './entities/parameter.entity'
import { PrismaService } from '../../prisma/prisma.service'
import { isUUID } from 'class-validator'

@Injectable()
export class ParametersService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  async create( createParameterInput : CreateParameterInput ) : Promise<Parameter> {
    try {
      const parameter = await this.prismaService.parameters.create({
        data: { ...createParameterInput }
      })
      return parameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll() {
    // TODO: don't return parameters with status false
    const parameters = await this.prismaService.parameters.findMany({
      include: {
        subparameters: true,
        creator: true,
        updater: true
      }
    })
    return parameters
  }

  async findOne ( term : string ) {
    // TODO: don't return parameters with status false
    if ( isUUID( term ) ) {
      const parameter = await this.prismaService.parameters.findUnique({
        where: { id: term },
        include: {
          subparameters: true,
          creator: true,
          updater: true
        }
      })
      if ( !parameter ) throw new NotFoundException( `Parameter ${ term } not found` )
      return parameter
    }
    const parameter = await this.prismaService.parameters.findUnique({
      where: { name: term },
      include: {
        subparameters: true,
        creator: true,
        updater: true
      }
    })
    if ( !parameter ) throw new NotFoundException( `Parameter ${ term } not found` )
    return parameter
  }

  async update( id : string, updateParameterInput : UpdateParameterInput ) {
    await this.findOne( id )
    try {
      const parameter = await this.prismaService.parameters.update({
        where: { id },
        data: { ...updateParameterInput }
      })
      return parameter
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string ) : Promise<Parameter> {
    await this.findOne( id )
    try {
      const parameter = await this.prismaService.parameters.update({
        where: { id },
        data: { status: false }
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
