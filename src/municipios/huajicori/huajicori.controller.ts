import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HuajicoriService } from './huajicori.service';
import { CreateHuajicoriBeneficiarioDto } from './dto/create-huajicori-beneficiario.dto';
import { CreateHuajicoriBeneficioDto } from './dto/create-huajicori-beneficio.dto';
import { CreateHuajicoriDomicilioDto } from './dto/create-huajicori-domicilio.dto';
import { UpdateHuajicoriCompletoDto } from './dto/update-huajicori-completo.dto';

@Controller('huajicori')
export class HuajicoriController {
  constructor(private readonly huajicoriService: HuajicoriService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateHuajicoriBeneficiarioDto,
    @Body() createBeneficioDto: CreateHuajicoriBeneficioDto,
    @Body() createDomicilioDto: CreateHuajicoriDomicilioDto,
  ): Promise<any> {
    return await this.huajicoriService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateHuajicoriBeneficiarioDto[],
    @Body() beneficios: CreateHuajicoriBeneficioDto[],
    @Body() domicilios: CreateHuajicoriDomicilioDto[],
  ) {
    try {
      const resultados = await this.huajicoriService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.huajicoriService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHuajicoriCompletoDto: UpdateHuajicoriCompletoDto) {
    return this.huajicoriService.update(+id, updateHuajicoriCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.huajicoriService.remove(+id);
  }
}
