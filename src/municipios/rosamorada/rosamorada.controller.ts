import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RosamoradaService } from './rosamorada.service';
import { UpdateRosamoradaDto } from './dto/update-rosamorada.dto';

@Controller('rosamorada')
export class RosamoradaController {
  constructor(private readonly rosamoradaService: RosamoradaService) {}

  // @Post()
  // create(@Body() createRosamoradaDto: CreateRosamoradaDto) {
  //   return this.rosamoradaService.create(createRosamoradaDto);
  // }

  @Get()
  findAll() {
    return this.rosamoradaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rosamoradaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRosamoradaDto: UpdateRosamoradaDto) {
    return this.rosamoradaService.update(+id, updateRosamoradaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rosamoradaService.remove(+id);
  }
}
