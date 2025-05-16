import { Injectable } from '@nestjs/common';
import { UpdateBahiaBanderaDto } from './dto/update-bahia-bandera.dto';

@Injectable()
export class BahiaBanderasService {
  // create(createBahiaBanderaDto: CreateBahiaBanderaDto) {
  //   return 'This action adds a new bahiaBandera';
  // }

  findAll() {
    return `This action returns all bahiaBanderas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bahiaBandera`;
  }

  update(id: number, updateBahiaBanderaDto: UpdateBahiaBanderaDto) {
    return `This action updates a #${id} bahiaBandera`;
  }

  remove(id: number) {
    return `This action removes a #${id} bahiaBandera`;
  }
}
