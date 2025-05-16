import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IcatenPubService } from './icaten-pub.service';
import { UpdateIcatenPubDto } from './dto/update-icaten-pub.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateIcatenBeneficiarioDto } from './dto/create-icaten-beneficiario.dto';
import { CreateIcatenBeneficioDto } from './dto/create-icaten-beneficio.dto';
import { CreateIcatenDomicilioDto } from './dto/create-icaten-domicilio.dto';

@ApiBearerAuth()
@Controller('icaten-pub')
export class IcatenPubController {
  constructor(private readonly icatenPubService: IcatenPubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateIcatenBeneficiarioDto,
    @Body() createBeneficioDto: CreateIcatenBeneficioDto,
    @Body() createDomicilioDto: CreateIcatenDomicilioDto,
  ): Promise<any> {
    return await this.icatenPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateIcatenBeneficiarioDto[],
    @Body() beneficios: CreateIcatenBeneficioDto[],
    @Body() domicilios: CreateIcatenDomicilioDto[],
  ) {
    try {
      const resultados = await this.icatenPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.icatenPubService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.icatenPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIcatenPubDto: UpdateIcatenPubDto) {
    return this.icatenPubService.update(+id, updateIcatenPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.icatenPubService.remove(+id);
  }
}
