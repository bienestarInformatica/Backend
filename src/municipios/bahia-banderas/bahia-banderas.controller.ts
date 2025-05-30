import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BahiaBanderasService } from './bahia-banderas.service';
import { CreateBahiaBeneficiarioDto } from './dto/create-bahia-banderas-beneficiario.dto';
import { CreateBahiaBeneficioDto } from './dto/create-bahia-banderas-beneficio.dto';
import { CreateBahiaDomicilioDto } from './dto/create-bahia-banderas-domicilio.dto';
import { UpdateBahiaCompletoDto } from './dto/update-bahia-banderas-completo.dto';

@Controller('bahia-banderas')
export class BahiaBanderasController {
  constructor(private readonly bahiaBanderasService: BahiaBanderasService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateBahiaBeneficiarioDto,
    @Body() createBeneficioDto: CreateBahiaBeneficioDto,
    @Body() createDomicilioDto: CreateBahiaDomicilioDto,
  ): Promise<any> {
    return await this.bahiaBanderasService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateBahiaBeneficiarioDto[],
    @Body() beneficios: CreateBahiaBeneficioDto[],
    @Body() domicilios: CreateBahiaDomicilioDto[],
  ) {
    try {
      const resultados = await this.bahiaBanderasService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.bahiaBanderasService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBahiaCompletoDto: UpdateBahiaCompletoDto) {
    return this.bahiaBanderasService.update(+id, updateBahiaCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bahiaBanderasService.remove(+id);
  }
}
