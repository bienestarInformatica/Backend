import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SantaMariaOroService } from './santa-maria-oro.service';
import { CreateSantaMariaOroBeneficiarioDto } from './dto/create-santa-maria-oro-beneficiario.dto';
import { CreateSantaMariaOroBeneficioDto } from './dto/create-santa-maria-oro-beneficio.dto';
import { CreateSantaMariaOroDomicilioDto } from './dto/create-santa-maria-oro-domicilio.dto';
import { UpdateSantaMariaOroCompletoDto } from './dto/update-santa-maria-oro-completo.dto';

@Controller('santa-maria-oro')
export class SantaMariaOroController {
  constructor(private readonly santaMariaOroService: SantaMariaOroService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateSantaMariaOroBeneficiarioDto,
    @Body() createBeneficioDto: CreateSantaMariaOroBeneficioDto,
    @Body() createDomicilioDto: CreateSantaMariaOroDomicilioDto,
  ): Promise<any> {
    return await this.santaMariaOroService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateSantaMariaOroBeneficiarioDto[],
    @Body() beneficios: CreateSantaMariaOroBeneficioDto[],
    @Body() domicilios: CreateSantaMariaOroDomicilioDto[],
  ) {
    try {
      const resultados = await this.santaMariaOroService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.santaMariaOroService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSantaMariaOroCompletoDto: UpdateSantaMariaOroCompletoDto) {
    return this.santaMariaOroService.update(+id, updateSantaMariaOroCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.santaMariaOroService.remove(+id);
  }
}
