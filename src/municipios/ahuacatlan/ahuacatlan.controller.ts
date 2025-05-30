import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AhuacatlanService } from './ahuacatlan.service';
import { UpdateAhuacatlanDto } from './dto/update-ahuacatlan.dto';
import { CreateAhuacatlanBeneficiarioDto } from './dto/create-ahuacatlan-beneficiario.dto';
import { CreateAhuacatlanBeneficioDto } from './dto/create-ahuacatlan-beneficio.dto';
import { CreateAhuacatlanDomicilioDto } from './dto/create-ahuacatlan-domicilio.dto';

@Controller('ahuacatlan')
export class AhuacatlanController {
  constructor(private readonly ahuacatlanService: AhuacatlanService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateAhuacatlanBeneficiarioDto,
    @Body() createBeneficioDto: CreateAhuacatlanBeneficioDto,
    @Body() createDomicilioDto: CreateAhuacatlanDomicilioDto,
  ): Promise<any> {
    return await this.ahuacatlanService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateAhuacatlanBeneficiarioDto[],
    @Body() beneficios: CreateAhuacatlanBeneficioDto[],
    @Body() domicilios: CreateAhuacatlanDomicilioDto[],
  ) {
    try {
      const resultados = await this.ahuacatlanService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.ahuacatlanService.findAllWithRelations();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAhuacatlanCompletoDto: UpdateAhuacatlanCompletoDto) {
  //   return this.ahuacatlanService.update(+id, updateAhuacatlanCompletoDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ahuacatlanService.remove(+id);
  }
}
