import { Injectable } from '@nestjs/common';
import { UpdateRosamoradaDto } from './dto/update-rosamorada.dto';

@Injectable()
export class RosamoradaService {
  // create(createRosamoradaDto: CreateRosamoradaDto) {
  //   return 'This action adds a new rosamorada';
  // }

  findAll() {
    return `This action returns all rosamorada`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rosamorada`;
  }

  update(id: number, updateRosamoradaDto: UpdateRosamoradaDto) {
    return `This action updates a #${id} rosamorada`;
  }

  remove(id: number) {
    return `This action removes a #${id} rosamorada`;
  }
}
