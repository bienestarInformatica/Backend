import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuizService } from './ruiz.service';
import { UpdateRuizDto } from './dto/update-ruiz.dto';

@Controller('ruiz')
export class RuizController {
  constructor(private readonly ruizService: RuizService) {}

  // @Post()
  // create(@Body() createRuizDto: CreateRuizDto) {
  //   return this.ruizService.create(createRuizDto);
  // }

  @Get()
  findAll() {
    return this.ruizService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ruizService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuizDto: UpdateRuizDto) {
    return this.ruizService.update(+id, updateRuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ruizService.remove(+id);
  }
}
