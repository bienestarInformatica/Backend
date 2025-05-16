import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AhuacatlanService } from './ahuacatlan.service';
import { UpdateAhuacatlanDto } from './dto/update-ahuacatlan.dto';

@Controller('ahuacatlan')
export class AhuacatlanController {
  constructor(private readonly ahuacatlanService: AhuacatlanService) {}

  @Post()
  // create(@Body() createAhuacatlanDto: CreateAhuacatlanDto) {
  //   return this.ahuacatlanService.create(createAhuacatlanDto);
  // }

  @Get()
  findAll() {
    return this.ahuacatlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ahuacatlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAhuacatlanDto: UpdateAhuacatlanDto) {
    return this.ahuacatlanService.update(+id, updateAhuacatlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ahuacatlanService.remove(+id);
  }
}
