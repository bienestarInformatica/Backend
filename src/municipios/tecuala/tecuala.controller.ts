import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TecualaService } from './tecuala.service';
import { CreateTecualaBeneficiarioDto } from './dto/create-tecuala-beneficiario.dto';
import { CreateTecualaBeneficioDto } from './dto/create-tecuala-beneficio.dto';
import { CreateTecualaDomicilioDto } from './dto/create-tecuala-domicilio.dto';
import { UpdateTecualaCompletoDto } from './dto/update-tecuala-completo.dto';

@Controller('tecuala')
export class TecualaController {
  constructor(private readonly tecualaService: TecualaService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateTecualaBeneficiarioDto,
    @Body() createBeneficioDto: CreateTecualaBeneficioDto,
    @Body() createDomicilioDto: CreateTecualaDomicilioDto,
  ): Promise<any> {
    return await this.tecualaService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateTecualaBeneficiarioDto[],
    @Body() beneficios: CreateTecualaBeneficioDto[],
    @Body() domicilios: CreateTecualaDomicilioDto[],
  ) {
    try {
      const resultados = await this.tecualaService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.tecualaService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTecualaCompletoDto: UpdateTecualaCompletoDto) {
    return this.tecualaService.update(+id, updateTecualaCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tecualaService.remove(+id);
  }
}
