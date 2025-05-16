import { Injectable } from '@nestjs/common';
import { UpdateTuxpanDto } from './dto/update-tuxpan.dto';

@Injectable()
export class TuxpanService {
  // create(createTuxpanDto: CreateTuxpanDto) {
  //   return 'This action adds a new tuxpan';
  // }

  findAll() {
    return `This action returns all tuxpan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tuxpan`;
  }

  update(id: number, updateTuxpanDto: UpdateTuxpanDto) {
    return `This action updates a #${id} tuxpan`;
  }

  remove(id: number) {
    return `This action removes a #${id} tuxpan`;
  }
}
