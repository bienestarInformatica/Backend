import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SanPedroLagunillasService } from './san-pedro-lagunillas.service';
import { UpdateSanPedroLagunillaDto } from './dto/update-san-pedro-lagunilla.dto';

@Controller('san-pedro-lagunillas')
export class SanPedroLagunillasController {
  constructor(private readonly sanPedroLagunillasService: SanPedroLagunillasService) {}

  // @Post()
  // create(@Body() createSanPedroLagunillaDto: CreateSanPedroLagunillaDto) {
  //   return this.sanPedroLagunillasService.create(createSanPedroLagunillaDto);
  // }

  @Get()
  findAll() {
    return this.sanPedroLagunillasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sanPedroLagunillasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSanPedroLagunillaDto: UpdateSanPedroLagunillaDto) {
    return this.sanPedroLagunillasService.update(+id, updateSanPedroLagunillaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sanPedroLagunillasService.remove(+id);
  }
}
