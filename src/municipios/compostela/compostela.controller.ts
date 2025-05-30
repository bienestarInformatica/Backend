import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompostelaService } from './compostela.service';
import { CreateCompostelaBeneficiarioDto } from './dto/create-compostela-beneficiario.dto';
import { CreateCompostelaBeneficioDto } from './dto/create-compostela-beneficio.dto';
import { CreateCompostelaDomicilioDto } from './dto/create-compostela-domicilio.dto';
import { UpdateCompostelaCompletoDto } from './dto/update-compostela-completo.dto';

@Controller('compostela')
export class CompostelaController {
  constructor(private readonly compostelaService: CompostelaService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateCompostelaBeneficiarioDto,
    @Body() createBeneficioDto: CreateCompostelaBeneficioDto,
    @Body() createDomicilioDto: CreateCompostelaDomicilioDto,
  ): Promise<any> {
    return await this.compostelaService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateCompostelaBeneficiarioDto[],
    @Body() beneficios: CreateCompostelaBeneficioDto[],
    @Body() domicilios: CreateCompostelaDomicilioDto[],
  ) {
    try {
      const resultados = await this.compostelaService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.compostelaService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompostelaCompletoDto: UpdateCompostelaCompletoDto) {
    return this.compostelaService.update(+id, updateCompostelaCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compostelaService.remove(+id);
  }
}
