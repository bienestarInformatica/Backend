import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RuizService } from './ruiz.service';
import { CreateRuizBeneficiarioDto } from './dto/create-ruiz-beneficiario.dto';
import { CreateRuizBeneficioDto } from './dto/create-ruiz-beneficio.dto';
import { CreateRuizDomicilioDto } from './dto/create-ruiz-domicilio.dto';
import { UpdateRuizCompletoDto } from './dto/update-ruiz-completo.dto';

@Controller('ruiz')
export class RuizController {
  constructor(private readonly ruizService: RuizService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateRuizBeneficiarioDto,
    @Body() createBeneficioDto: CreateRuizBeneficioDto,
    @Body() createDomicilioDto: CreateRuizDomicilioDto,
  ): Promise<any> {
    return await this.ruizService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateRuizBeneficiarioDto[],
    @Body() beneficios: CreateRuizBeneficioDto[],
    @Body() domicilios: CreateRuizDomicilioDto[],
  ) {
    try {
      const resultados = await this.ruizService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.ruizService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuizCompletoDto: UpdateRuizCompletoDto) {
    return this.ruizService.update(+id, updateRuizCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ruizService.remove(+id);
  }
}
