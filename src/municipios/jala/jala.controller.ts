import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JalaService } from './jala.service';
import { UpdateJalaDto } from './dto/update-jala.dto';
import { CreateJalaBeneficiarioDto } from './dto/create-jala-beneficiario.dto';
import { CreateJalaBeneficioDto } from './dto/create-jala-beneficio.dto';
import { CreateJalaDomicilioDto } from './dto/create-jala-domicilio.dto';

@Controller('jala')
export class JalaController {
  constructor(private readonly jalaService: JalaService) {}

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateJalaBeneficiarioDto,
    @Body() createBeneficioDto: CreateJalaBeneficioDto,
    @Body() createDomicilioDto: CreateJalaDomicilioDto,
  ): Promise<any> {
    return await this.jalaService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateJalaBeneficiarioDto[],
    @Body() beneficios: CreateJalaBeneficioDto[],
    @Body() domicilios: CreateJalaDomicilioDto[],
  ) {
    try {
      const resultados = await this.jalaService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get('all')
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.jalaService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jalaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJalaDto: UpdateJalaDto) {
    return this.jalaService.update(+id, updateJalaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jalaService.remove(+id);
  }
}
