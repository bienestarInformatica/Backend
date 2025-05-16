import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CecanPubService } from './cecan-pub.service';
import { UpdateCecanPubDto } from './dto/update-cecan-pub.dto';
import { CreateCecanBeneficiarioDto } from './dto/create-cecan-beneficiario.dto';
import { CreateCecanBeneficioDto } from './dto/create-cecan-beneficio.dto';
import { CreateCecanDomicilioDto } from './dto/create-cecan.domicilio.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@ApiBearerAuth()
@Controller('cecan-pub')
export class CecanPubController {
  constructor(private readonly cecanPubService: CecanPubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateCecanBeneficiarioDto,
    @Body() createBeneficioDto: CreateCecanBeneficioDto,
    @Body() createDomicilioDto: CreateCecanDomicilioDto,
  ): Promise<any> {
    return await this.cecanPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateCecanBeneficiarioDto[],
    @Body() beneficios: CreateCecanBeneficioDto[],
    @Body() domicilios: CreateCecanDomicilioDto[],
  ) {
    try {
      const resultados = await this.cecanPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.cecanPubService.findAllWithRelations();
  }

  @Get(':curp')
  async findByCurp(@Param('curp') curp: string) {
    return this.cecanPubService.findByCurpWithRelations(curp);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cecanPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCecanPubDto: UpdateCecanPubDto) {
    return this.cecanPubService.update(+id, updateCecanPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cecanPubService.remove(+id);
  }
}
