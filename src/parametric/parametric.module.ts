import { Module } from '@nestjs/common'
import { ParametricService } from './parametric.service'
import { ParametricResolver } from './parametric.resolver'

@Module({
  providers: [ ParametricResolver, ParametricService ],
})
export class ParametricModule {}
