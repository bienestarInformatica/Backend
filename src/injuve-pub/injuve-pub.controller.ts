import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InjuvePubService } from './injuve-pub.service';
import { UpdateInjuvePubDto } from './dto/update-injuve-pub.dto';
import { CreateInjuveBeneficiarioDto } from './dto/create-injuve-beneficiario.dto';
import { CreateInjuveBeneficioDto } from './dto/create-injuve-beneficio.dto';
import { CreateInjuveDomicilioDto } from './dto/create-injuve-domicilio.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@ApiBearerAuth()
@Controller('injuve-pub')
export class InjuvePubController {
  constructor(private readonly injuvePubService: InjuvePubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateInjuveBeneficiarioDto,
    @Body() createBeneficioDto: CreateInjuveBeneficioDto,
    @Body() createDomicilioDto: CreateInjuveDomicilioDto,
  ): Promise<any> {
    return await this.injuvePubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateInjuveBeneficiarioDto[],
    @Body() beneficios: CreateInjuveBeneficioDto[],
    @Body() domicilios: CreateInjuveDomicilioDto[],
  ) {
    try {
      const resultados = await this.injuvePubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  async findAll(): Promise<any> {
    return this.injuvePubService.findAllWithRelations();
  }

  @Get(':curp')
  async findByCurp(@Param('curp') curp: string) {
    return this.injuvePubService.findByCurpWithRelations(curp);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.injuvePubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInjuvePubDto: UpdateInjuvePubDto) {
    return this.injuvePubService.update(+id, updateInjuvePubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.injuvePubService.remove(+id);
  }
}
