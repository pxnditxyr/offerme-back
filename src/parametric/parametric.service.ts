import { Injectable } from '@nestjs/common'
import { CreateParametricInput } from './dto/create-parametric.input'
import { UpdateParametricInput } from './dto/update-parametric.input'

@Injectable()
export class ParametricService {
  create(createParametricInput: CreateParametricInput) {
    return 'This action adds a new parametric'
  }

  findAll() {
    return `This action returns all parametric`
  }

  findOne(id: number) {
    return `This action returns a #${id} parametric`
  }

  update(id: string, updateParametricInput: UpdateParametricInput) {
    return `This action updates a #${id} parametric`
  }

  remove(id: number) {
    return `This action removes a #${id} parametric`
  }
}
