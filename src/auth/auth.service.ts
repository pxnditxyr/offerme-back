import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { compareSync } from 'bcrypt'
import { SigninDto, SignupDto } from './dto'
import { UsersService } from '../users/users/users.service'
import { PeopleInfoService } from 'src/users/people-info/people-info.service'
import { RolesService } from 'src/users/roles/roles.service'
import { SubparametersService } from 'src/parametrics/subparameters/subparameters.service'
import { SessionsService } from 'src/users/sessions/sessions.service'
import { JwtService } from '@nestjs/jwt'
import { AuthResponse } from './types/auth-response.types'
import { User } from 'src/users/users/entities/user.entity'
import { ValidRoles } from './enums/valid-roles.enum'
import { GenderResponse } from './types'

@Injectable()
export class AuthService {

  constructor (
    private readonly usersService : UsersService,
    private readonly peopleInfoService : PeopleInfoService,
    private readonly rolesService : RolesService,
    private readonly subparametersService : SubparametersService,
    private readonly sessionsService : SessionsService,
    private readonly jwtService : JwtService
  ) {}

  async signup ( signupDto : SignupDto, request : Request, ipAddress : string ) : Promise<AuthResponse> {

    const {
      birthdate, maternalSurname, paternalSurname,
      name, genderId, email, password, googleId
    } = signupDto

    const role = await this.rolesService.findByName( ValidRoles.USER )
    const gender = await this.subparametersService.findOne( genderId )

    const peopleInfo = await this.peopleInfoService.create({
      birthdate,
      maternalSurname,
      paternalSurname,
      name,
      genderId: gender.id
    })

    const user = await this.usersService.create({
      peopleInfoId: peopleInfo.id,
      roleId: role.id,
      email,
      password,
      googleId: googleId || null
    })

    const token = this.getJwtToken( user.id )

    await this.sessionsService.create({
      userId: user.id,
      token,
      ipAddress,
      userAgent: request.headers[ 'user-agent' ]
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        peopleInfo: {
          id: peopleInfo.id,
          name: peopleInfo.name,
          paternalSurname: peopleInfo.paternalSurname,
          maternalSurname: peopleInfo.maternalSurname,
          birthdate: peopleInfo.birthdate,
          genderId: peopleInfo.genderId
        },
        role: {
          id: role.id,
          name: role.name
        },
      },
      token
    }
  }

  async signin ( signinDto : SigninDto, request : Request, ipAddress : string ) : Promise<AuthResponse> {
    const { email, password } = signinDto
    const user = await this.usersService.findByEmail( email )
    
    if ( !compareSync( password, user.password ) ) throw new UnauthorizedException( 'Invalid credentials' )
    const token = this.getJwtToken( user.id )
    await this.sessionsService.create({
      userId: user.id,
      token,
      ipAddress,
      userAgent: request.headers[ 'user-agent' ]
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        peopleInfo: {
          id: user.peopleInfo.id,
          name: user.peopleInfo.name,
          paternalSurname: user.peopleInfo.paternalSurname,
          maternalSurname: user.peopleInfo.maternalSurname,
          birthdate: user.peopleInfo.birthdate,
          genderId: user.peopleInfo.genderId
        },
        role: {
          id: user.role.id,
          name: user.role.name
        },
      },
      token
    }
    
  }

  revalidateToken ( user : User ) : AuthResponse {
    const token = this.getJwtToken( user.id )
    if ( !user.peopleInfo ) throw new InternalServerErrorException( 'Unexpected error, please check the logs' )
    if ( !user.role ) throw new InternalServerErrorException( 'Unexpected error, please check the logs' )
    return {
      user: {
        id: user.id,
        email: user.email,
        peopleInfo: {
          id: user.peopleInfo.id,
          name: user.peopleInfo.name,
          paternalSurname: user.peopleInfo.paternalSurname,
          maternalSurname: user.peopleInfo.maternalSurname,
          birthdate: user.peopleInfo.birthdate,
          genderId: user.peopleInfo.genderId
        },
        role: {
          id: user.role.id,
          name: user.role.name
        },
      },
      token
    }
  }


  async validateUser ( id : string ) : Promise<User> {
    const user = await this.usersService.findOne( id )
    if ( !user.status ) throw new UnauthorizedException( 'This user has been deactivated, please contact the administrator' )
    return user
  }

  async findAllGenders () : Promise<GenderResponse[]> {
    const genders = await this.subparametersService.findAllByParameterName( 'gender' )
    const activeGenders = genders.filter( ({ status }) => status )
    return activeGenders.map( ({ id, name }) => ({ id, name }) )
  }

  private getJwtToken ( id : string ) : string {
    return this.jwtService.sign({ id })
  }
}
