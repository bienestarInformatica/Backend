import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StjlPubService } from './stjl-pub.service';
import { UpdateStjlPubDto } from './dto/update-stjl-pub.dto';
import { CreateStjlBeneficiarioDto } from './dto/create-stjl-beneficiario.dto';
import { CreateStjlBeneficioDto } from './dto/create-stjl-beneficio.dto';
import { CreateStjlDomicilioDto } from './dto/create-stjl-domicilio.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('stjl-pub')
export class StjlPubController {
  constructor(private readonly stjlPubService: StjlPubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateStjlBeneficiarioDto,
    @Body() createBeneficioDto: CreateStjlBeneficioDto,
    @Body() createDomicilioDto: CreateStjlDomicilioDto,
  ): Promise<any> {
    return await this.stjlPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateStjlBeneficiarioDto[],
    @Body() beneficios: CreateStjlBeneficioDto[],
    @Body() domicilios: CreateStjlDomicilioDto[],
  ) {
    try {
      const resultados = await this.stjlPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.stjlPubService.findAllWithRelations();
  }

  @Get(':curp')
  async findByCurp(@Param('curp') curp: string) {
    return this.stjlPubService.findByCurpWithRelations(curp);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stjlPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStjlPubDto: UpdateStjlPubDto) {
    return this.stjlPubService.update(+id, updateStjlPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stjlPubService.remove(+id);
  }
}
