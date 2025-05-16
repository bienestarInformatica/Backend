import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TecualaService } from './tecuala.service';
import { UpdateTecualaDto } from './dto/update-tecuala.dto';

@Controller('tecuala')
export class TecualaController {
  constructor(private readonly tecualaService: TecualaService) {}

  // @Post()
  // create(@Body() createTecualaDto: CreateTecualaDto) {
  //   return this.tecualaService.create(createTecualaDto);
  // }

  @Get()
  findAll() {
    return this.tecualaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tecualaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTecualaDto: UpdateTecualaDto) {
    return this.tecualaService.update(+id, updateTecualaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tecualaService.remove(+id);
  }
}
