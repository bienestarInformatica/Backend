import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CjfamiliarPubService } from './cjfamiliar-pub.service';
import { UpdateCjfamiliarPubDto } from './dto/update-cjfamiliar-pub.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateCjfamiliarBeneficiarioDto } from './dto/create-cjfamiliar-beneficiario.dto';
import { CreateCjfamiliarBeneficioDto } from './dto/create-cjfamiliar-beneficio.dto';
import { CreateCjfamiliarDomicilioDto } from './dto/create-cjfamiliar-domicilio.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('cjfamiliar-pub')
export class CjfamiliarPubController {
  constructor(private readonly cjfamiliarPubService: CjfamiliarPubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateCjfamiliarBeneficiarioDto,
    @Body() createBeneficioDto: CreateCjfamiliarBeneficioDto,
    @Body() createDomicilioDto: CreateCjfamiliarDomicilioDto,
  ): Promise<any> {
    return await this.cjfamiliarPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateCjfamiliarBeneficiarioDto[],
    @Body() beneficios: CreateCjfamiliarBeneficioDto[],
    @Body() domicilios: CreateCjfamiliarDomicilioDto[],
  ) {
    try {
      const resultados = await this.cjfamiliarPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.cjfamiliarPubService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cjfamiliarPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCjfamiliarPubDto: UpdateCjfamiliarPubDto) {
    return this.cjfamiliarPubService.update(+id, updateCjfamiliarPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cjfamiliarPubService.remove(+id);
  }
}
