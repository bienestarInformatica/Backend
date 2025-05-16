import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AmatlanCañasService } from './amatlan-cañas.service';
import { UpdateAmatlanCañaDto } from './dto/update-amatlan-caña.dto';
import { CreateAmatlanBeneficiarioDto } from './dto/create-amatlan-cañas-beneficiario.dto';
import { CreateAmatlanBeneficioDto } from './dto/create-amatlan-cañas-beneficio.dto';
import { CreateAmatlanDomicilioDto } from './dto/create-amatlan-cañas-domicilio.dto';

@Controller('amatlan')
export class AmatlanCañasController {
  constructor(private readonly amatlanCañasService: AmatlanCañasService) {}

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateAmatlanBeneficiarioDto,
    @Body() createBeneficioDto: CreateAmatlanBeneficioDto,
    @Body() createDomicilioDto: CreateAmatlanDomicilioDto,
  ): Promise<any> {
    return await this.amatlanCañasService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Get()
  findAll() {
    return this.amatlanCañasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amatlanCañasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmatlanCañaDto: UpdateAmatlanCañaDto) {
    return this.amatlanCañasService.update(+id, updateAmatlanCañaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amatlanCañasService.remove(+id);
  }
}
