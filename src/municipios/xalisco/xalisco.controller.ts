import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XaliscoService } from './xalisco.service';
import { UpdateXaliscoDto } from './dto/update-xalisco.dto';

@Controller('xalisco')
export class XaliscoController {
  constructor(private readonly xaliscoService: XaliscoService) {}

  // @Post()
  // create(@Body() createXaliscoDto: CreateXaliscoDto) {
  //   return this.xaliscoService.create(createXaliscoDto);
  // }

  @Get()
  findAll() {
    return this.xaliscoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xaliscoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXaliscoDto: UpdateXaliscoDto) {
    return this.xaliscoService.update(+id, updateXaliscoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xaliscoService.remove(+id);
  }
}
