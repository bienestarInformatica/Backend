import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IprovinayPubService } from './iprovinay-pub.service';
import { UpdateIprovinayPubDto } from './dto/update-iprovinay-pub.dto';
import { CreateIprovinayBeneficiarioDto } from './dto/create-iprovinay-beneficiario.dto';
import { CreateIprovinayBeneficioDto } from './dto/create-iprovinay-beneficio.dto';
import { CreateIprovinayDomicilioDto } from './dto/create-iprovinay-domicilio.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';

@ApiBearerAuth()
@Controller('iprovinay-pub')
export class IprovinayPubController {
  constructor(private readonly iprovinayPubService: IprovinayPubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateIprovinayBeneficiarioDto,
    @Body() createBeneficioDto: CreateIprovinayBeneficioDto,
    @Body() createDomicilioDto: CreateIprovinayDomicilioDto,
  ): Promise<any> {
    return await this.iprovinayPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateIprovinayBeneficiarioDto[],
    @Body() beneficios: CreateIprovinayBeneficioDto[],
    @Body() domicilios: CreateIprovinayDomicilioDto[],
  ) {
    try {
      const resultados = await this.iprovinayPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.iprovinayPubService.findAllWithRelations();
  }

  @Get(':curp')
  async findByCurp(@Param('curp') curp: string) {
    return this.iprovinayPubService.findByCurpWithRelations(curp);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.iprovinayPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIprovinayPubDto: UpdateIprovinayPubDto) {
    return this.iprovinayPubService.update(+id, updateIprovinayPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.iprovinayPubService.remove(+id);
  }
}
