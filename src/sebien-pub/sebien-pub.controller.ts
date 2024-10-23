import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { SebienPubService } from './sebien-pub.service';
import { UpdateSebienPubDto } from './dto/update-sebien-pub.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateSebienBeneficiarioDto } from './dto/create-sebien-beneficiario.dto';
import { CreateSebienBeneficioDto } from './dto/create-sebien-beneficio.dto';
import { CreateSebienDomicilioDto } from './dto/create-sebien-domicilio.dto';
import { ApiBearerAuth } from '@nestjs/swagger';


@ApiBearerAuth()
@Controller('sebien-pub')
export class SebienPubController {
  constructor(private readonly sebienPubService: SebienPubService) { }

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateSebienBeneficiarioDto,
    @Body() createBeneficioDto: CreateSebienBeneficioDto,
    @Body() createDomicilioDto: CreateSebienDomicilioDto,
  ): Promise<any> {
    return await this.sebienPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateSebienBeneficiarioDto[],
    @Body() beneficios: CreateSebienBeneficioDto[],
    @Body() domicilios: CreateSebienDomicilioDto[],
  ) {
    try {
      const resultados = await this.sebienPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.sebienPubService.findAllWithRelations();
  }

  @Get(':curp')
  async findByCurp(@Param('curp') curp: string) {
    return this.sebienPubService.findByCurpWithRelations(curp);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sebienPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSebienPubDto: UpdateSebienPubDto) {
    return this.sebienPubService.update(+id, updateSebienPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sebienPubService.remove(+id);
  }
}
