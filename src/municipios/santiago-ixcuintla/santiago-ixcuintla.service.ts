import { Injectable } from '@nestjs/common';
import { UpdateSantiagoIxcuintlaDto } from './dto/update-santiago-ixcuintla.dto';

@Injectable()
export class SantiagoIxcuintlaService {
  // create(createSantiagoIxcuintlaDto: CreateSantiagoIxcuintlaDto) {
  //   return 'This action adds a new santiagoIxcuintla';
  // }

  findAll() {
    return `This action returns all santiagoIxcuintla`;
  }

  findOne(id: number) {
    return `This action returns a #${id} santiagoIxcuintla`;
  }

  update(id: number, updateSantiagoIxcuintlaDto: UpdateSantiagoIxcuintlaDto) {
    return `This action updates a #${id} santiagoIxcuintla`;
  }

  remove(id: number) {
    return `This action removes a #${id} santiagoIxcuintla`;
  }
}
