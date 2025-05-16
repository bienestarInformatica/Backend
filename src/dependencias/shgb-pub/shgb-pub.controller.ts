import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShgbPubService } from './shgb-pub.service';
import { UpdateShgbPubDto } from './dto/update-shgb-pub.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateShgbBeneficiarioDto } from './dto/create-shgb-beneficiario.dto';
import { CreateShgbBeneficioDto } from './dto/create-shgb-beneficio.dto';
import { CreateShgbDomicilioDto } from './dto/create-shgb-domicilio.dto';

@ApiBearerAuth()
@Controller('shgb-pub')
export class ShgbPubController {
  constructor(private readonly shgbPubService: ShgbPubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateShgbBeneficiarioDto,
    @Body() createBeneficioDto: CreateShgbBeneficioDto,
    @Body() createDomicilioDto: CreateShgbDomicilioDto,
  ): Promise<any> {
    return await this.shgbPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateShgbBeneficiarioDto[],
    @Body() beneficios: CreateShgbBeneficioDto[],
    @Body() domicilios: CreateShgbDomicilioDto[],
  ) {
    try {
      const resultados = await this.shgbPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.shgbPubService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShgbPubDto: UpdateShgbPubDto) {
    return this.shgbPubService.update(+id, updateShgbPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shgbPubService.remove(+id);
  }
}
