import { Injectable } from '@nestjs/common';
import { UpdateHuajicoriDto } from './dto/update-huajicori.dto';

@Injectable()
export class HuajicoriService {
  // create(createHuajicoriDto: CreateHuajicoriDto) {
  //   return 'This action adds a new huajicori';
  // }

  findAll() {
    return `This action returns all huajicori`;
  }

  findOne(id: number) {
    return `This action returns a #${id} huajicori`;
  }

  update(id: number, updateHuajicoriDto: UpdateHuajicoriDto) {
    return `This action updates a #${id} huajicori`;
  }

  remove(id: number) {
    return `This action removes a #${id} huajicori`;
  }
}
