import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TuxpanService } from './tuxpan.service';
import { UpdateTuxpanDto } from './dto/update-tuxpan.dto';

@Controller('tuxpan')
export class TuxpanController {
  constructor(private readonly tuxpanService: TuxpanService) {}

  // @Post()
  // create(@Body() createTuxpanDto: CreateTuxpanDto) {
  //   return this.tuxpanService.create(createTuxpanDto);
  // }

  @Get()
  findAll() {
    return this.tuxpanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tuxpanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTuxpanDto: UpdateTuxpanDto) {
    return this.tuxpanService.update(+id, updateTuxpanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tuxpanService.remove(+id);
  }
}
