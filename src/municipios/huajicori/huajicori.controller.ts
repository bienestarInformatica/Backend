import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HuajicoriService } from './huajicori.service';
import { UpdateHuajicoriDto } from './dto/update-huajicori.dto';

@Controller('huajicori')
export class HuajicoriController {
  constructor(private readonly huajicoriService: HuajicoriService) {}

  // @Post()
  // create(@Body() createHuajicoriDto: CreateHuajicoriDto) {
  //   return this.huajicoriService.create(createHuajicoriDto);
  // }

  @Get()
  findAll() {
    return this.huajicoriService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.huajicoriService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHuajicoriDto: UpdateHuajicoriDto) {
    return this.huajicoriService.update(+id, updateHuajicoriDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.huajicoriService.remove(+id);
  }
}
