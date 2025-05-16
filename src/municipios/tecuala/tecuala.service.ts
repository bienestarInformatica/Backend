import { Injectable } from '@nestjs/common';
import { UpdateTecualaDto } from './dto/update-tecuala.dto';

@Injectable()
export class TecualaService {
  // create(createTecualaDto: CreateTecualaDto) {
  //   return 'This action adds a new tecuala';
  // }

  findAll() {
    return `This action returns all tecuala`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tecuala`;
  }

  update(id: number, updateTecualaDto: UpdateTecualaDto) {
    return `This action updates a #${id} tecuala`;
  }

  remove(id: number) {
    return `This action removes a #${id} tecuala`;
  }
}
