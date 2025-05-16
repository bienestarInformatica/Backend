import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SantiagoIxcuintlaService } from './santiago-ixcuintla.service';
import { UpdateSantiagoIxcuintlaDto } from './dto/update-santiago-ixcuintla.dto';

@Controller('santiago-ixcuintla')
export class SantiagoIxcuintlaController {
  constructor(private readonly santiagoIxcuintlaService: SantiagoIxcuintlaService) {}

  // @Post()
  // create(@Body() createSantiagoIxcuintlaDto: CreateSantiagoIxcuintlaDto) {
  //   return this.santiagoIxcuintlaService.create(createSantiagoIxcuintlaDto);
  // }

  @Get()
  findAll() {
    return this.santiagoIxcuintlaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.santiagoIxcuintlaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSantiagoIxcuintlaDto: UpdateSantiagoIxcuintlaDto) {
    return this.santiagoIxcuintlaService.update(+id, updateSantiagoIxcuintlaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.santiagoIxcuintlaService.remove(+id);
  }
}
