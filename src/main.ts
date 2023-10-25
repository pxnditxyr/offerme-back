import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap () {
  const logger = new Logger( 'main' )
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  )

  app.useGlobalPipes(
    new ValidationPipe( {
      whitelist: true,
    } )
  )
  await app.listen( process.env.PORT || 3000 )
  logger.verbose( `Application is running on: ${ await app.getUrl() }/graphql` )
}

bootstrap()
