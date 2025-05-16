import { Injectable } from '@nestjs/common';
import { UpdateIxtlanDto } from './dto/update-ixtlan.dto';

@Injectable()
export class IxtlanService {
  // create(createIxtlanDto: CreateIxtlanDto) {
  //   return 'This action adds a new ixtlan';
  // }

  findAll() {
    return `This action returns all ixtlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ixtlan`;
  }

  update(id: number, updateIxtlanDto: UpdateIxtlanDto) {
    return `This action updates a #${id} ixtlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} ixtlan`;
  }
}
