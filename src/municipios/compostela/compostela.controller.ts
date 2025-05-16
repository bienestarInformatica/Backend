import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompostelaService } from './compostela.service';
import { UpdateCompostelaDto } from './dto/update-compostela.dto';

@Controller('compostela')
export class CompostelaController {
  constructor(private readonly compostelaService: CompostelaService) {}

  // @Post()
  // create(@Body() createCompostelaDto: CreateCompostelaDto) {
  //   return this.compostelaService.create(createCompostelaDto);
  // }

  @Get()
  findAll() {
    return this.compostelaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compostelaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompostelaDto: UpdateCompostelaDto) {
    return this.compostelaService.update(+id, updateCompostelaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compostelaService.remove(+id);
  }
}
