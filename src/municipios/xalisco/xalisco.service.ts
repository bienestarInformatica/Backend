import { Injectable } from '@nestjs/common';
import { UpdateXaliscoDto } from './dto/update-xalisco.dto';

@Injectable()
export class XaliscoService {
  // create(createXaliscoDto: CreateXaliscoDto) {
  //   return 'This action adds a new xalisco';
  // }

  findAll() {
    return `This action returns all xalisco`;
  }

  findOne(id: number) {
    return `This action returns a #${id} xalisco`;
  }

  update(id: number, updateXaliscoDto: UpdateXaliscoDto) {
    return `This action updates a #${id} xalisco`;
  }

  remove(id: number) {
    return `This action removes a #${id} xalisco`;
  }
}
