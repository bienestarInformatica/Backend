import { Injectable } from '@nestjs/common';
import { UpdateAcaponetaDto } from './dto/update-acaponeta.dto';

@Injectable()
export class AcaponetaService {
  // create(createAcaponetaDto: CreateAcaponetaDto) {
  //   return 'This action adds a new acaponeta';
  // }

  findAll() {
    return `This action returns all acaponeta`;
  }

  findOne(id: number) {
    return `This action returns a #${id} acaponeta`;
  }

  update(id: number, updateAcaponetaDto: UpdateAcaponetaDto) {
    return `This action updates a #${id} acaponeta`;
  }

  remove(id: number) {
    return `This action removes a #${id} acaponeta`;
  }
}
