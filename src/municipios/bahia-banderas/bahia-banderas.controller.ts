import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BahiaBanderasService } from './bahia-banderas.service';
import { UpdateBahiaBanderaDto } from './dto/update-bahia-bandera.dto';

@Controller('bahia-banderas')
export class BahiaBanderasController {
  constructor(private readonly bahiaBanderasService: BahiaBanderasService) {}

  // @Post()
  // create(@Body() createBahiaBanderaDto: CreateBahiaBanderaDto) {
  //   return this.bahiaBanderasService.create(createBahiaBanderaDto);
  // }

  @Get()
  findAll() {
    return this.bahiaBanderasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bahiaBanderasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBahiaBanderaDto: UpdateBahiaBanderaDto) {
    return this.bahiaBanderasService.update(+id, updateBahiaBanderaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bahiaBanderasService.remove(+id);
  }
}
