import { Injectable } from '@nestjs/common';
import { UpdateJalaDto } from './dto/update-jala.dto';

@Injectable()
export class JalaService {
  // create(createJalaDto: CreateJalaDto) {
  //   return 'This action adds a new jala';
  // }

  findAll() {
    return `This action returns all jala`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jala`;
  }

  update(id: number, updateJalaDto: UpdateJalaDto) {
    return `This action updates a #${id} jala`;
  }

  remove(id: number) {
    return `This action removes a #${id} jala`;
  }
}
