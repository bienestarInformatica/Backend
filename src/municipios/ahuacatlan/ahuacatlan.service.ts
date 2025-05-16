import { Injectable } from '@nestjs/common';
import { UpdateAhuacatlanDto } from './dto/update-ahuacatlan.dto';

@Injectable()
export class AhuacatlanService {
  // create(createAhuacatlanDto: CreateAhuacatlanDto) {
  //   return 'This action adds a new ahuacatlan';
  // }

  findAll() {
    return `This action returns all ahuacatlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ahuacatlan`;
  }

  update(id: number, updateAhuacatlanDto: UpdateAhuacatlanDto) {
    return `This action updates a #${id} ahuacatlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} ahuacatlan`;
  }
}
