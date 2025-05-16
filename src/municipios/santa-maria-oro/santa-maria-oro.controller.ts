import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SantaMariaOroService } from './santa-maria-oro.service';
import { UpdateSantaMariaOroDto } from './dto/update-santa-maria-oro.dto';

@Controller('santa-maria-oro')
export class SantaMariaOroController {
  constructor(private readonly santaMariaOroService: SantaMariaOroService) {}

  // @Post()
  // create(@Body() createSantaMariaOroDto: CreateSantaMariaOroDto) {
  //   return this.santaMariaOroService.create(createSantaMariaOroDto);
  // }

  @Get()
  findAll() {
    return this.santaMariaOroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.santaMariaOroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSantaMariaOroDto: UpdateSantaMariaOroDto) {
    return this.santaMariaOroService.update(+id, updateSantaMariaOroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.santaMariaOroService.remove(+id);
  }
}
