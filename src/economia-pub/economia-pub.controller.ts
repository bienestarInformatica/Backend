import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EconomiaPubService } from './economia-pub.service';
import { UpdateEconomiaPubDto } from './dto/update-economia-pub.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateEconomiaBeneficiarioDto } from './dto/create-economia-beneficiario.dto';
import { CreateEconomiaBeneficioDto } from './dto/create-economia-beneficio.dto';
import { CreateEconomiaDomicilioDto } from './dto/create-economia-domicilio.dto';

@ApiBearerAuth()
@Controller('economia-pub')
export class EconomiaPubController {
  constructor(private readonly economiaPubService: EconomiaPubService) { }

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateEconomiaBeneficiarioDto,
    @Body() createBeneficioDto: CreateEconomiaBeneficioDto,
    @Body() createDomicilioDto: CreateEconomiaDomicilioDto,
  ): Promise<any> {
    return await this.economiaPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateEconomiaBeneficiarioDto[],
    @Body() beneficios: CreateEconomiaBeneficioDto[],
    @Body() domicilios: CreateEconomiaDomicilioDto[],
  ) {
    try {
      const resultados = await this.economiaPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.economiaPubService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.economiaPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEconomiaPubDto: UpdateEconomiaPubDto) {
    return this.economiaPubService.update(+id, updateEconomiaPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.economiaPubService.remove(+id);
  }
}
