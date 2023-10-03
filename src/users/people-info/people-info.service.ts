import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { CreatePeopleInfoInput, UpdatePeopleInfoInput } from './dto/inputs'
import { PeopleInfo } from './entities/people-info.entity'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class PeopleInfoService {

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService
  ) {}

  // async create( createPeopleInfoInput : CreatePeopleInfoInput ) : Promise<PeopleInfo> {
  //   return 'This action adds a new peopleInfo'
  // }

  async findAll () {
    const peopleInfo = await this.prismaService.peopleInfo.findMany({
      include: {
        creator: true,
        updater: true,
        gender: true,
        documentType: true
      }
    })
    return peopleInfo
  }

  async findOne ( id : string ) {
    const peopleInfo = await this.prismaService.peopleInfo.findUnique({
      where: { id },
      include: {
        creator: true,
        updater: true,
        gender: true,
        documentType: true
      }
    })
    if ( !peopleInfo ) throw new NotFoundException( `PeopleInfo with ID ${ id } not found` )
    return peopleInfo
  }

  // async update ( id : string, updatePeopleInfoInput : UpdatePeopleInfoInput ) : Promise<PeopleInfo> {
  //   return `This action updates a #${id} peopleInfo`
  // }
  //
  // async deactivate ( id : string ) : Promise<PeopleInfo> {
  //   return `This action removes a #${id} peopleInfo`
  // }
}
