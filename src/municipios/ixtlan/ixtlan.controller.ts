import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IxtlanService } from './ixtlan.service';
import { UpdateIxtlanDto } from './dto/update-ixtlan.dto';

@Controller('ixtlan')
export class IxtlanController {
  constructor(private readonly ixtlanService: IxtlanService) {}

  // @Post()
  // create(@Body() createIxtlanDto: CreateIxtlanDto) {
  //   return this.ixtlanService.create(createIxtlanDto);
  // }

  @Get()
  findAll() {
    return this.ixtlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ixtlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIxtlanDto: UpdateIxtlanDto) {
    return this.ixtlanService.update(+id, updateIxtlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ixtlanService.remove(+id);
  }
}
