import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SanBlasService } from './san-blas.service';
import { UpdateSanBlaDto } from './dto/update-san-bla.dto';

@Controller('san-blas')
export class SanBlasController {
  constructor(private readonly sanBlasService: SanBlasService) {}

  // @Post()
  // create(@Body() createSanBlaDto: CreateSanBlaDto) {
  //   return this.sanBlasService.create(createSanBlaDto);
  // }

  @Get()
  findAll() {
    return this.sanBlasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sanBlasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSanBlaDto: UpdateSanBlaDto) {
    return this.sanBlasService.update(+id, updateSanBlaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sanBlasService.remove(+id);
  }
}
