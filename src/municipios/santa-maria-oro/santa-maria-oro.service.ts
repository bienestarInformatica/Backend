import { Injectable } from '@nestjs/common';
import { UpdateSantaMariaOroDto } from './dto/update-santa-maria-oro.dto';

@Injectable()
export class SantaMariaOroService {
  // create(createSantaMariaOroDto: CreateSantaMariaOroDto) {
  //   return 'This action adds a new santaMariaOro';
  // }

  findAll() {
    return `This action returns all santaMariaOro`;
  }

  findOne(id: number) {
    return `This action returns a #${id} santaMariaOro`;
  }

  update(id: number, updateSantaMariaOroDto: UpdateSantaMariaOroDto) {
    return `This action updates a #${id} santaMariaOro`;
  }

  remove(id: number) {
    return `This action removes a #${id} santaMariaOro`;
  }
}
