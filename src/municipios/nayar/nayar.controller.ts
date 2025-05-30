import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NayarService } from './nayar.service';
import { CreateNayarBeneficiarioDto } from './dto/create-nayar-beneficiario.dto';
import { CreateNayarBeneficioDto } from './dto/create-nayar-beneficio.dto';
import { CreateNayarDomicilioDto } from './dto/create-nayar-domicilio.dto';
import { UpdateNayarCompletoDto } from './dto/update-nayar-completo.dto';

@Controller('nayar')
export class NayarController {
  constructor(private readonly nayarService: NayarService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateNayarBeneficiarioDto,
    @Body() createBeneficioDto: CreateNayarBeneficioDto,
    @Body() createDomicilioDto: CreateNayarDomicilioDto,
  ): Promise<any> {
    return await this.nayarService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateNayarBeneficiarioDto[],
    @Body() beneficios: CreateNayarBeneficioDto[],
    @Body() domicilios: CreateNayarDomicilioDto[],
  ) {
    try {
      const resultados = await this.nayarService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.nayarService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNayarCompletoDto: UpdateNayarCompletoDto) {
    return this.nayarService.update(+id, updateNayarCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nayarService.remove(+id);
  }
}
