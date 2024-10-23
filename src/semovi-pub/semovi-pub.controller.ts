import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SemoviPubService } from './semovi-pub.service';
import { UpdateSemoviPubDto } from './dto/update-semovi-pub.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateSemoviBeneficiarioDto } from './dto/create-semovi-beneficiario.dto';
import { CreateSemoviBeneficioDto } from './dto/create-semovi-beneficio.dto';
import { CreateSemoviDomicilioDto } from './dto/create-semovi-domicilio.dto';

@ApiBearerAuth()
@Controller('semovi-pub')
export class SemoviPubController {
  constructor(private readonly semoviPubService: SemoviPubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateSemoviBeneficiarioDto,
    @Body() createBeneficioDto: CreateSemoviBeneficioDto,
    @Body() createDomicilioDto: CreateSemoviDomicilioDto,
  ): Promise<any> {
    return await this.semoviPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateSemoviBeneficiarioDto[],
    @Body() beneficios: CreateSemoviBeneficioDto[],
    @Body() domicilios: CreateSemoviDomicilioDto[],
  ) {
    try {
      const resultados = await this.semoviPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.semoviPubService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.semoviPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSemoviPubDto: UpdateSemoviPubDto) {
    return this.semoviPubService.update(+id, updateSemoviPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.semoviPubService.remove(+id);
  }
}
