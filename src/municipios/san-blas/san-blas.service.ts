import { Injectable } from '@nestjs/common';
import { UpdateSanBlaDto } from './dto/update-san-bla.dto';

@Injectable()
export class SanBlasService {
  // create(createSanBlaDto: CreateSanBlaDto) {
  //   return 'This action adds a new sanBla';
  // }

  findAll() {
    return `This action returns all sanBlas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sanBla`;
  }

  update(id: number, updateSanBlaDto: UpdateSanBlaDto) {
    return `This action updates a #${id} sanBla`;
  }

  remove(id: number) {
    return `This action removes a #${id} sanBla`;
  }
}
