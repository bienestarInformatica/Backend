import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RosamoradaService } from './rosamorada.service';
import { CreateRosamoradaBeneficiarioDto } from './dto/create-rosamorada-beneficiario.dto';
import { CreateRosamoradaBeneficioDto } from './dto/create-rosamorada-beneficio.dto';
import { CreateRosamoradaDomicilioDto } from './dto/create-rosamorada-domicilio.dto';
import { UpdateRosamoradaCompletoDto } from './dto/update-rosamorada-completo.dto';

@Controller('rosamorada')
export class RosamoradaController {
  constructor(private readonly rosamoradaService: RosamoradaService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateRosamoradaBeneficiarioDto,
    @Body() createBeneficioDto: CreateRosamoradaBeneficioDto,
    @Body() createDomicilioDto: CreateRosamoradaDomicilioDto,
  ): Promise<any> {
    return await this.rosamoradaService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateRosamoradaBeneficiarioDto[],
    @Body() beneficios: CreateRosamoradaBeneficioDto[],
    @Body() domicilios: CreateRosamoradaDomicilioDto[],
  ) {
    try {
      const resultados = await this.rosamoradaService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.rosamoradaService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRosamoradaCompletoDto: UpdateRosamoradaCompletoDto) {
    return this.rosamoradaService.update(+id, updateRosamoradaCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rosamoradaService.remove(+id);
  }
}
