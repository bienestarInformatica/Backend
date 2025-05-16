import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JalaService } from './jala.service';
import { UpdateJalaDto } from './dto/update-jala.dto';

@Controller('jala')
export class JalaController {
  constructor(private readonly jalaService: JalaService) {}

  // @Post()
  // create(@Body() createJalaDto: CreateJalaDto) {
  //   return this.jalaService.create(createJalaDto);
  // }

  @Get()
  findAll() {
    return this.jalaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jalaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJalaDto: UpdateJalaDto) {
    return this.jalaService.update(+id, updateJalaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jalaService.remove(+id);
  }
}
