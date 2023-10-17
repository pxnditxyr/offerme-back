import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'src/prisma'
import { parametersData, subparametersData, peopleInfoData, userData } from './data'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum'
import { UsersService } from 'src/users/users/users.service'

@Injectable()
export class SeedService {

  private isProduction : boolean

  constructor (
    @Inject( PrismaService )
    private readonly prismaService : PrismaService,

    private readonly configService : ConfigService,
    private readonly usersService : UsersService
  ) {
    this.isProduction = this.configService.get<string>( 'STATE' ) === 'prod'
  }

  async seed () : Promise<boolean> {
    if ( this.isProduction ) throw new BadRequestException( 'You cannot seed database in production' )

    await this.deleteAllDatabase()
    try {
      await this.createParameters()

      await this.createSubparameters()

      await this.createRoles()

      const adminRoleId = await this.getRoleId( ValidRoles.ADMIN )

      const peopleInfo = await this.createAdminPeopleInfo()

      await this.createAdminUser({
        peopleInfoId: peopleInfo.id,
        roleId: adminRoleId
      })
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
    return true
  }

  private async deleteAllDatabase () {

    const tablenames = await this.prismaService.$queryRaw<
      Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    const tables = tablenames
      .map( ({ tablename }) => tablename )
      .filter( ( name ) => name !== '_prisma_migrations' )
      .map( ( name ) => `"public"."${ name }"` )
      .join( ', ' )

    try {
      await this.prismaService.$executeRawUnsafe( `TRUNCATE TABLE ${ tables } CASCADE;` )
    } catch ( error ) {
      this.handlerDBExceptions( error )
    }
  }


  private async createParameters () {
    await this.prismaService.parameters.createMany({
      data: [ ...parametersData ],
    })
  }

  private async createSubparameters () {
    const allSubparametersData = subparametersData()

    const subparametersDataWithParameterId = await Promise.all( allSubparametersData.map( async ( subparameter ) => {
      const parameterId = await this.getParameterId( subparameter.parameterId )
      return { ...subparameter, parameterId }
    } ) )

    await this.prismaService.subparameters.createMany({
       data: [ ...subparametersDataWithParameterId ],
    })
  }

  private async createRoles () {
    const validRoles = ValidRoles
    const roles = Object.keys( validRoles ).map( ( key ) => validRoles[ key ] )
    await this.prismaService.roles.createMany({
      data: [
        ...roles.map( ( role ) => ({ name: role }) )
      ]
    })
  }

  private async createAdminPeopleInfo () {
    const genderId = await this.getGenderId( peopleInfoData.genderId )
    return await this.prismaService.peopleInfo.create({
      data: {
        ...peopleInfoData,
        genderId
      }
    })
  }

  private async createAdminUser ( { peopleInfoId, roleId } : { peopleInfoId: string, roleId: string }) {
    return await this.usersService.create({
      ...userData,
      peopleInfoId,
      roleId,
    })
  }

  private async getGenderId ( genderName : string ) : Promise<string> {
    const gender = await this.prismaService.subparameters.findFirst({
      where: { name: genderName }
    })
    if ( !gender ) throw new NotFoundException( `Gender ${ genderName } not found` )
    return gender.id
  }
      

  private async getParameterId ( parameterName : string ) : Promise<string> {
    const parameter = await this.prismaService.parameters.findUnique({
      where: { name: parameterName }
    })
    if ( !parameter ) throw new NotFoundException( `Parameter ${ parameterName } not found` )
    return parameter.id
  }

  private async getRoleId ( roleName : string ) : Promise<string> {
    const role = await this.prismaService.roles.findUnique({
      where: { name: roleName }
    })
    if ( !role ) throw new BadRequestException( `Role ${ roleName } not found` )
    return role.id
  }

  private handlerDBExceptions ( error : any ) : never {
    console.error( error )
    throw new InternalServerErrorException( 'Unexpected error, please check logs' )
  }
}
