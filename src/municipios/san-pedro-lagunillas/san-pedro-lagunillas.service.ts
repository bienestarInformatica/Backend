import { Injectable } from '@nestjs/common';
import { UpdateSanPedroLagunillaDto } from './dto/update-san-pedro-lagunilla.dto';

@Injectable()
export class SanPedroLagunillasService {
  // create(createSanPedroLagunillaDto: CreateSanPedroLagunillaDto) {
  //   return 'This action adds a new sanPedroLagunilla';
  // }

  findAll() {
    return `This action returns all sanPedroLagunillas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sanPedroLagunilla`;
  }

  update(id: number, updateSanPedroLagunillaDto: UpdateSanPedroLagunillaDto) {
    return `This action updates a #${id} sanPedroLagunilla`;
  }

  remove(id: number) {
    return `This action removes a #${id} sanPedroLagunilla`;
  }
}
