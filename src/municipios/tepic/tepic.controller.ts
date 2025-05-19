import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TepicService } from './tepic.service';
import { UpdateTepicDto } from './dto/update-tepic.dto';
import { CreateTepicBeneficiarioDto } from './dto/create-tepic-beneficiario.dto';
import { CreateTepicBeneficioDto } from './dto/create-tepic-beneficio.dto';
import { CreateTepicDomicilioDto } from './dto/create-tepic-domicilio.dto';

@Controller('tepic')
export class TepicController {
  constructor(
    private readonly tepicService: TepicService,
  ) { }

  @Post()
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateTepicBeneficiarioDto,
    @Body() createBeneficioDto: CreateTepicBeneficioDto,
    @Body() createDomicilioDto: CreateTepicDomicilioDto,
  ): Promise<any> {
    return await this.tepicService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  async importarExcel(
    @Body() beneficiarios: CreateTepicBeneficiarioDto[],
    @Body() beneficios: CreateTepicBeneficioDto[],
    @Body() domicilios: CreateTepicDomicilioDto[],
  ) {
    try {
      const resultados = await this.tepicService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  // @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.tepicService.findAllWithRelations();
  }
  
  // @Get()
  // findAll() {
  //   return this.tepicService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tepicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTepicDto: UpdateTepicDto) {
    return this.tepicService.update(+id, updateTepicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tepicService.remove(+id);
  }
}
