import { Injectable } from '@nestjs/common';
import { UpdateRuizDto } from './dto/update-ruiz.dto';

@Injectable()
export class RuizService {
  // create(createRuizDto: CreateRuizDto) {
  //   return 'This action adds a new ruiz';
  // }

  findAll() {
    return `This action returns all ruiz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ruiz`;
  }

  update(id: number, updateRuizDto: UpdateRuizDto) {
    return `This action updates a #${id} ruiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} ruiz`;
  }
}
