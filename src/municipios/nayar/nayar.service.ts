import { Injectable } from '@nestjs/common';
import { UpdateNayarDto } from './dto/update-nayar.dto';

@Injectable()
export class NayarService {
  // create(createNayarDto: CreateNayarDto) {
  //   return 'This action adds a new nayar';
  // }

  findAll() {
    return `This action returns all nayar`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nayar`;
  }

  update(id: number, updateNayarDto: UpdateNayarDto) {
    return `This action updates a #${id} nayar`;
  }

  remove(id: number) {
    return `This action removes a #${id} nayar`;
  }
}
