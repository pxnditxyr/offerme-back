import { Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { CreateClickCounterPerPeriodInput, UpdateClickCounterPerPeriodInput } from './dto/inputs'
import { PrismaService } from 'src/prisma'
import { CompaniesService } from 'src/companies/companies/companies.service'
import { User } from 'src/users/users/entities/user.entity'
import { IFindAllOptions } from 'src/common/interfaces'
import { ClickCounterPerPeriod } from './entities/click-counter-per-period.entity'

@Injectable()
export class ClickCounterPerPeriodService {
  
  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly companiesService : CompaniesService
  ) {}

  async create ( createClickCounterPerPeriodInput : CreateClickCounterPerPeriodInput, creator? : User ) : Promise<ClickCounterPerPeriod> {
    const { companyId } = createClickCounterPerPeriodInput
    await this.companiesService.findOne( companyId )

    try {
      const clickCounterPerPeriod = await this.prismaService.clickCounterPerPeriod.create({
        data: {
          ...createClickCounterPerPeriodInput,
          createdBy: creator?.id,
        },
        include: {
          company: true,
          creator: true,
          updater: true
        }
      })
      return clickCounterPerPeriod
    } catch ( error : any ) {
      this.handlerDBExceptions( error )
    }

  }

  async findAll ( { searchArgs, paginationArgs } : IFindAllOptions ) : Promise<ClickCounterPerPeriod[]> {
    const { search, status } = searchArgs
    const { offset, limit } = paginationArgs
    const clickCounterPerPeriods = await this.prismaService.clickCounterPerPeriod.findMany({
      where: {
        status: status ?? undefined,
        company: { name: { contains: search ?? undefined } }
      },
      include: {
        company: true,
        creator: true,
        updater: true
      },
      skip: offset ?? undefined,
      take: limit ?? undefined
    })
    return clickCounterPerPeriods
  }

  async findOne ( id : string ) : Promise<ClickCounterPerPeriod> {
    const clickCounterPerPeriod = await this.prismaService.clickCounterPerPeriod.findUnique({
      where: { id },
      include: {
        company: true,
        creator: true,
        updater: true
      }
    })
    if ( !clickCounterPerPeriod ) throw new NotFoundException( 'ClickCounterPerPeriod not found' )
    return clickCounterPerPeriod
  }

  async update ( id : string, updateClickCounterPerPeriodInput : UpdateClickCounterPerPeriodInput, updater : User ) : Promise<ClickCounterPerPeriod> {
    await this.findOne( id )
    const { companyId } = updateClickCounterPerPeriodInput
    if ( companyId ) await this.companiesService.findOne( companyId )
    try {
      const clickCounterPerPeriod = await this.prismaService.clickCounterPerPeriod.update({
        where: { id },
        data: {
          ...updateClickCounterPerPeriodInput,
          updatedBy: updater.id
        },
        include: {
          company: true,
          creator: true,
          updater: true
        }
      })
      return clickCounterPerPeriod
    } catch ( error : any ) {
      this.handlerDBExceptions( error )
    }
  }

  async toggleStatus ( id : string, updater : User ) : Promise<ClickCounterPerPeriod> {
    const currentClickCounterPerPeriod = await this.findOne( id )
    try {
      const clickCounterPerPeriod = await this.prismaService.clickCounterPerPeriod.update({
        where: { id },
        data: {
          status: !currentClickCounterPerPeriod.status,
          updatedBy: updater.id
        },
        include: {
          company: true,
          creator: true,
          updater: true
        }
      })
      return clickCounterPerPeriod
    } catch ( error : any ) {
      this.handlerDBExceptions( error )
    }
  }

  async addClick ( companyId : string ) : Promise<ClickCounterPerPeriod> {
    await this.companiesService.findOne( companyId )
    let clickCounterPerPeriod : ClickCounterPerPeriod | null = await this.prismaService.clickCounterPerPeriod.findFirst({
      where: {
        companyId,
        status: true,
        startDate: { lte: new Date() },
        endDate: { gte: new Date() }
      },
    })
    if ( !clickCounterPerPeriod ) {
      clickCounterPerPeriod = await this.create({
        companyId,
        startDate: new Date(),
        endDate: new Date( new Date().setDate( new Date().getDate() + 1 ) )
      } )
    }
    try {
      const newClickCounterPerPeriod = await this.prismaService.clickCounterPerPeriod.update({
        where: { id: clickCounterPerPeriod.id },
        data: {
          count: clickCounterPerPeriod.count + 1
        },
        include: {
          company: true,
          creator: true,
          updater: true
        }
      })
      return newClickCounterPerPeriod
    } catch ( error : any ) {
      this.handlerDBExceptions( error )
    }
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check the logs for more details' )
  }
}
