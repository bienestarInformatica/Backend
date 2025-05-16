import { Injectable } from '@nestjs/common';
import { UpdateCompostelaDto } from './dto/update-compostela.dto';

@Injectable()
export class CompostelaService {
  // create(createCompostelaDto: CreateCompostelaDto) {
  //   return 'This action adds a new compostela';
  // }

  findAll() {
    return `This action returns all compostela`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compostela`;
  }

  update(id: number, updateCompostelaDto: UpdateCompostelaDto) {
    return `This action updates a #${id} compostela`;
  }

  remove(id: number) {
    return `This action removes a #${id} compostela`;
  }
}
