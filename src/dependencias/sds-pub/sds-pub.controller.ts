import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SdsPubService } from './sds-pub.service';
import { UpdateSdsPubDto } from './dto/update-sds-pub.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateSdsBeneficiarioDto } from './dto/create-sds-beneficiario.dto';
import { CreateSdsBeneficioDto } from './dto/create-sds-beneficio.dto';
import { CreateSdsDomicilioDto } from './dto/create-sds-domicilio.dto';

@ApiBearerAuth()
@Controller('sds-pub')
export class SdsPubController {
  constructor(private readonly sdsPubService: SdsPubService) { }

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateSdsBeneficiarioDto,
    @Body() createBeneficioDto: CreateSdsBeneficioDto,
    @Body() createDomicilioDto: CreateSdsDomicilioDto,
  ): Promise<any> {
    return await this.sdsPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateSdsBeneficiarioDto[],
    @Body() beneficios: CreateSdsBeneficioDto[],
    @Body() domicilios: CreateSdsDomicilioDto[],
  ) {
    try {
      const resultados = await this.sdsPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.sdsPubService.findAllWithRelations();
  }
    
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sdsPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSdsPubDto: UpdateSdsPubDto) {
    return this.sdsPubService.update(+id, updateSdsPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sdsPubService.remove(+id);
  }
}
