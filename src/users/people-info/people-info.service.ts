import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreatePeopleInfoInput, UpdatePeopleInfoInput } from './dto/inputs'
import { PeopleInfo } from './entities/people-info.entity'
import { PrismaService } from '../../prisma'
import { SubparametersService } from '../../parametrics/subparameters/subparameters.service'
import { User } from '../users/entities/user.entity'

const peopleInfoIncludes = {
  creator: true,
  updater: true,
  gender: true,
  documentType: true
}

@Injectable()
export class PeopleInfoService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly subparametersService : SubparametersService

  ) {}

  async create( createPeopleInfoInput : CreatePeopleInfoInput, creator? : User ) : Promise<PeopleInfo> {

    const { genderId, documentTypeId } = createPeopleInfoInput
    await this.subparametersService.findOne( genderId )
    if ( documentTypeId ) await this.subparametersService.findOne( documentTypeId )
    try {
      const peopleInfo = await this.prismaService.peopleInfo.create({
        data: {
          ...createPeopleInfoInput,
          birthdate: new Date( createPeopleInfoInput.birthdate ),
          createdBy: creator?.id
        }
      })
      return peopleInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async findAll () {
    const peopleInfo = await this.prismaService.peopleInfo.findMany({
      include: { ...peopleInfoIncludes }
    })
    return peopleInfo
  }

  async findOne ( id : string ) {
    const peopleInfo = await this.prismaService.peopleInfo.findUnique({
      where: { id },
      include: { ...peopleInfoIncludes }
    })
    if ( !peopleInfo ) throw new NotFoundException( `PeopleInfo with ID ${ id } not found` )
    return peopleInfo
  }

  async update ( id : string, updatePeopleInfoInput : UpdatePeopleInfoInput, updater : User ) : Promise<PeopleInfo> {
    await this.findOne( id )
    const { genderId, documentTypeId } = updatePeopleInfoInput
    if ( genderId ) await this.subparametersService.findOne( genderId )
    if ( documentTypeId ) await this.subparametersService.findOne( documentTypeId )
    try {
      const birthdate = updatePeopleInfoInput.birthdate ? new Date( updatePeopleInfoInput.birthdate ) : undefined
      const peopleInfo = await this.prismaService.peopleInfo.update({
        where: { id },
        data: {
          ...updatePeopleInfoInput,
          birthdate,
          updatedBy: updater.id
        }
      })
      return peopleInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  async deactivate ( id : string, updater : User ) : Promise<PeopleInfo> {
    await this.findOne( id )
    try {
      const peopleInfo = await this.prismaService.peopleInfo.update({
        where: { id },
        data: {
          status: false,
          updatedBy: updater.id
        }
      })
      return peopleInfo
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
