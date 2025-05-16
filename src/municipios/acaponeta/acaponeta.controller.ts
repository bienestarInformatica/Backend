import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcaponetaService } from './acaponeta.service';
import { UpdateAcaponetaDto } from './dto/update-acaponeta.dto';

@Controller('acaponeta')
export class AcaponetaController {
  constructor(private readonly acaponetaService: AcaponetaService) {}

  // @Post()
  // create(@Body() createAcaponetaDto: CreateAcaponetaDto) {
  //   return this.acaponetaService.create(createAcaponetaDto);
  // }

  @Get()
  findAll() {
    return this.acaponetaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.acaponetaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAcaponetaDto: UpdateAcaponetaDto) {
    return this.acaponetaService.update(+id, updateAcaponetaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.acaponetaService.remove(+id);
  }
}
