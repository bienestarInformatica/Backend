import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NayarService } from './nayar.service';
import { UpdateNayarDto } from './dto/update-nayar.dto';

@Controller('nayar')
export class NayarController {
  constructor(private readonly nayarService: NayarService) {}

  // @Post()
  // create(@Body() createNayarDto: CreateNayarDto) {
  //   return this.nayarService.create(createNayarDto);
  // }

  @Get()
  findAll() {
    return this.nayarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nayarService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNayarDto: UpdateNayarDto) {
    return this.nayarService.update(+id, updateNayarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nayarService.remove(+id);
  }
}
