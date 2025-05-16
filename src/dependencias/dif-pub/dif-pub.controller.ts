import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DifPubService } from './dif-pub.service';
import { UpdateDifPubDto } from './dto/update-dif-pub.dto';
import { CreateDifBeneficiarioDto } from './dto/create-dif-beneficiario.dto';
import { CreateDifBeneficioDto } from './dto/create-dif-beneficio.dto';
import { CreateDifDomicilioDto } from './dto/create-dif-domicilio.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@ApiBearerAuth()
@Controller('dif-pub')
export class DifPubController {
  constructor(private readonly difPubService: DifPubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateDifBeneficiarioDto,
    @Body() createBeneficioDto: CreateDifBeneficioDto,
    @Body() createDomicilioDto: CreateDifDomicilioDto,
  ): Promise<any> {
    return await this.difPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateDifBeneficiarioDto[],
    @Body() beneficios: CreateDifBeneficioDto[],
    @Body() domicilios: CreateDifDomicilioDto[],
  ) {
    try {
      const resultados = await this.difPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.difPubService.findAllWithRelations();
  }

  @Get(':curp')
  async findByCurp(@Param('curp') curp: string) {
    return this.difPubService.findByCurpWithRelations(curp);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.difPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDifPubDto: UpdateDifPubDto) {
    return this.difPubService.update(+id, updateDifPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.difPubService.remove(+id);
  }
}
