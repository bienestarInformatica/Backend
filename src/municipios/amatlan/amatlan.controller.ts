import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AmatlanService } from './amatlan.service';
import { CreateAmatlanBeneficiarioDto } from './dto/create-amatlan-beneficiario.dto';
import { CreateAmatlanBeneficioDto } from './dto/create-amatlan-beneficio.dto';
import { CreateAmatlanDomicilioDto } from './dto/create-amatlan-domicilio.dto';
import { UpdateAmatlanCompletoDto } from './dto/update-amatlan-completo.dto';


@Controller('amatlan')
export class AmatlanController {
  constructor(private readonly amatlanService: AmatlanService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateAmatlanBeneficiarioDto,
    @Body() createBeneficioDto: CreateAmatlanBeneficioDto,
    @Body() createDomicilioDto: CreateAmatlanDomicilioDto,
  ): Promise<any> {
    return await this.amatlanService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateAmatlanBeneficiarioDto[],
    @Body() beneficios: CreateAmatlanBeneficioDto[],
    @Body() domicilios: CreateAmatlanDomicilioDto[],
  ) {
    try {
      const resultados = await this.amatlanService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.amatlanService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmatlanCompletoDto: UpdateAmatlanCompletoDto) {
    return this.amatlanService.update(+id, updateAmatlanCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amatlanService.remove(+id);
  }
}
