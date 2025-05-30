import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { XaliscoService } from './xalisco.service';
import { CreateXaliscoBeneficiarioDto } from './dto/create-xalisco-beneficiario.dto';
import { CreateXaliscoBeneficioDto } from './dto/create-xalisco-beneficio.dto';
import { CreateXaliscoDomicilioDto } from './dto/create-xalisco-domicilio.dto';
import { UpdateXaliscoCompletoDto } from './dto/update-xalisco-completo.dto';

@Controller('xalisco')
export class XaliscoController {
  constructor(private readonly xaliscoService: XaliscoService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateXaliscoBeneficiarioDto,
    @Body() createBeneficioDto: CreateXaliscoBeneficioDto,
    @Body() createDomicilioDto: CreateXaliscoDomicilioDto,
  ): Promise<any> {
    return await this.xaliscoService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateXaliscoBeneficiarioDto[],
    @Body() beneficios: CreateXaliscoBeneficioDto[],
    @Body() domicilios: CreateXaliscoDomicilioDto[],
  ) {
    try {
      const resultados = await this.xaliscoService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.xaliscoService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateXaliscoCompletoDto: UpdateXaliscoCompletoDto) {
    return this.xaliscoService.update(+id, updateXaliscoCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.xaliscoService.remove(+id);
  }
}
