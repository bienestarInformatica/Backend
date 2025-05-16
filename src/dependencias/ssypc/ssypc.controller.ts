import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SsypcService } from './ssypc.service';
import { UpdateSsypcDto } from './dto/update-ssypc.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateSsypcBeneficiarioDto } from './dto/create-ssypc-beneficiario.dto';
import { CreateSsypcBeneficioDto } from './dto/create-ssypc-beneficio.dto';
import { CreateSsypcDomicilioDto } from './dto/create-ssypc-domicilio.dto';

@ApiBearerAuth()
@Controller('ssypc')
export class SsypcController {
  constructor(private readonly ssypcService: SsypcService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateSsypcBeneficiarioDto,
    @Body() createBeneficioDto: CreateSsypcBeneficioDto,
    @Body() createDomicilioDto: CreateSsypcDomicilioDto,
  ): Promise<any> {
    return await this.ssypcService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateSsypcBeneficiarioDto[],
    @Body() beneficios: CreateSsypcBeneficioDto[],
    @Body() domicilios: CreateSsypcDomicilioDto[],
  ) {
    try {
      const resultados = await this.ssypcService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.ssypcService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ssypcService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSsypcDto: UpdateSsypcDto) {
    return this.ssypcService.update(+id, updateSsypcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ssypcService.remove(+id);
  }
}
