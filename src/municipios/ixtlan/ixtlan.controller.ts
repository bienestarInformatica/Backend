import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IxtlanService } from './ixtlan.service';
import { CreateIxtlanBeneficiarioDto } from './dto/create-ixtlan-beneficiario.dto';
import { CreateIxtlanBeneficioDto } from './dto/create-ixtlan-beneficio.dto';
import { CreateIxtlanDomicilioDto } from './dto/create-ixtlan-domicilio.dto';
import { UpdateIxtlanCompletoDto } from './dto/update-ixtlan-completo.dto';

@Controller('ixtlan')
export class IxtlanController {
  constructor(private readonly ixtlanService: IxtlanService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateIxtlanBeneficiarioDto,
    @Body() createBeneficioDto: CreateIxtlanBeneficioDto,
    @Body() createDomicilioDto: CreateIxtlanDomicilioDto,
  ): Promise<any> {
    return await this.ixtlanService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateIxtlanBeneficiarioDto[],
    @Body() beneficios: CreateIxtlanBeneficioDto[],
    @Body() domicilios: CreateIxtlanDomicilioDto[],
  ) {
    try {
      const resultados = await this.ixtlanService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.ixtlanService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIxtlanCompletoDto: UpdateIxtlanCompletoDto) {
    return this.ixtlanService.update(+id, updateIxtlanCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ixtlanService.remove(+id);
  }
}
