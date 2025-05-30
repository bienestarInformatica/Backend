import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TuxpanService } from './tuxpan.service';
import { CreateTuxpanBeneficiarioDto } from './dto/create-tuxpan-beneficiario.dto';
import { CreateTuxpanBeneficioDto } from './dto/create-tuxpan-beneficio.dto';
import { CreateTuxpanDomicilioDto } from './dto/create-tuxpan-domicilio.dto';
import { UpdateTuxpanCompletoDto } from './dto/update-tuxpan-completo.dto';

@Controller('tuxpan')
export class TuxpanController {
  constructor(private readonly tuxpanService: TuxpanService) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateTuxpanBeneficiarioDto,
    @Body() createBeneficioDto: CreateTuxpanBeneficioDto,
    @Body() createDomicilioDto: CreateTuxpanDomicilioDto,
  ): Promise<any> {
    return await this.tuxpanService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateTuxpanBeneficiarioDto[],
    @Body() beneficios: CreateTuxpanBeneficioDto[],
    @Body() domicilios: CreateTuxpanDomicilioDto[],
  ) {
    try {
      const resultados = await this.tuxpanService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.tuxpanService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTuxpanCompletoDto: UpdateTuxpanCompletoDto) {
    return this.tuxpanService.update(+id, updateTuxpanCompletoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tuxpanService.remove(+id);
  }
}
