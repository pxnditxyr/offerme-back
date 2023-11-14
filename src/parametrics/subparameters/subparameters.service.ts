import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateSubparameterInput, UpdateSubparameterInput } from './dto/inputs'
import { PrismaService } from '../../prisma'
import { ParametersService } from '../parameters/parameters.service'
import { Subparameter } from './entities/subparameter.entity'
import { User } from 'src/users/users/entities/user.entity'
import { extractPrismaExceptions } from 'src/common/exception-catchers'
import { SearchArgs } from 'src/common/dto/args'
import { IFindAllOptions } from 'src/common/interfaces'

const subparameterIncludes = {
  parameter: true,
  creator: true,
  updater: true,
}

@Injectable()
export class SubparametersService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly parametersService : ParametersService
  ) {}

  async create ( createSubparameterInput : CreateSubparameterInput, creator : User ) : Promise<Subparameter> {

    await this.parametersService.findOne( createSubparameterInput.parameterId )

    try {
      const subparameter = await this.prismaService.subparameters.create({
        data: {
          ...createSubparameterInput,
          createdBy: creator.id
        }
      })
      return subparameter
    } catch ( error ) {
      this.handlerDBException( error )
    }
  }

  async findAll () {
    // TODO: don't return subparameters with status false
    // TODO: don't return subparameters with parameter status false
    const subparameters = await this.prismaService.subparameters.findMany({
      include: { ...subparameterIncludes }
    })
    return subparameters
  }
  async findAllByParameterName ( parameterName : string, { searchArgs } : IFindAllOptions ) {
    const { status } = searchArgs
    const parameter = await this.parametersService.findOne( parameterName )
    try {
      const subparameters = await this.prismaService.subparameters.findMany({
        where: {
          parameterId: parameter.id,
          status: status ?? undefined
        },
      })
      return subparameters
    } catch ( error ) {
      this.handlerDBException( error )
    }
  }

  async findOne ( id : string ) {
    const subparameter = await this.prismaService.subparameters.findUnique({
      where: { id },
      include: { ...subparameterIncludes }
    })
    if ( !subparameter ) throw new NotFoundException( `Subparameter with id ${ id } not found` )
    return subparameter
  }

  async update ( id : string, updateSubparameterInput : UpdateSubparameterInput, updater : User ) : Promise<Subparameter> {
    await this.findOne( id )
    try {
      const subparameter = await this.prismaService.subparameters.update({
        where: { id },
        data: {
          ...updateSubparameterInput,
          updatedBy: updater.id
        }
      })
      return subparameter
    } catch ( error ) {
      this.handlerDBException( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<Subparameter> {
    await this.findOne( id )
    try {
      const subparameter = await this.prismaService.subparameters.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return subparameter
    } catch ( error ) {
      this.handlerDBException( error )
    }
  }
  
  private handlerDBException ( error : any ) : never {
    console.error( error )
    const prismaErrors = extractPrismaExceptions( error )
    if ( prismaErrors ) throw new BadRequestException( prismaErrors )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
