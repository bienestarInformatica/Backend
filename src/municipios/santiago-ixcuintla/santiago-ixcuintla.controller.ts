import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SantiagoIxcuintlaService } from './santiago-ixcuintla.service';
import { CreateSantiagoIxcuintlaBeneficiarioDto } from './dto/create-santiago-ixcuintla-beneficiario.dto';
import { CreateSantiagoIxcuintlaBeneficioDto } from './dto/create-santiago-ixcuintla-beneficio.dto';
import { CreateSantiagoIxcuintlaDomicilioDto } from './dto/create-santiago-ixcuintla-domicilio.dto';
import { UpdateSantiagoIxcuintlaCompletoDto } from './dto/update-santiago-ixcuintla-completo.dto';

@Controller('santiago-ixcuintla')
export class SantiagoIxcuintlaController {
  constructor(private readonly santiagoIxcuintlaService: SantiagoIxcuintlaService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateSantiagoIxcuintlaBeneficiarioDto,
    @Body() createBeneficioDto: CreateSantiagoIxcuintlaBeneficioDto,
    @Body() createDomicilioDto: CreateSantiagoIxcuintlaDomicilioDto,
  ): Promise<any> {
    return await this.santiagoIxcuintlaService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateSantiagoIxcuintlaBeneficiarioDto[],
    @Body() beneficios: CreateSantiagoIxcuintlaBeneficioDto[],
    @Body() domicilios: CreateSantiagoIxcuintlaDomicilioDto[],
  ) {
    try {
      const resultados = await this.santiagoIxcuintlaService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.santiagoIxcuintlaService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSantiagoIxcuintlaCompletoDto: UpdateSantiagoIxcuintlaCompletoDto) {
    return this.santiagoIxcuintlaService.update(+id, updateSantiagoIxcuintlaCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.santiagoIxcuintlaService.remove(+id);
  }
}
