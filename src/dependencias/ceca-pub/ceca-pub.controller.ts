import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CecaPubService } from './ceca-pub.service';
import { UpdateCecaPubDto } from './dto/update-ceca-pub.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateCecaBeneficiarioDto } from './dto/create-ceca-beneficiario.dto';
import { CreateCecaBeneficioDto } from './dto/create-ceca-beneficio.dto';
import { CreateCecaDomicilioDto } from './dto/create-ceca-domicilio.dto';

@ApiBearerAuth()
@Controller('ceca-pub')
export class CecaPubController {
  constructor(private readonly cecaPubService: CecaPubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateCecaBeneficiarioDto,
    @Body() createBeneficioDto: CreateCecaBeneficioDto,
    @Body() createDomicilioDto: CreateCecaDomicilioDto,
  ): Promise<any> {
    return await this.cecaPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateCecaBeneficiarioDto[],
    @Body() beneficios: CreateCecaBeneficioDto[],
    @Body() domicilios: CreateCecaDomicilioDto[],
  ) {
    try {
      const resultados = await this.cecaPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.cecaPubService.findAllWithRelations();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCecaPubDto: UpdateCecaPubDto) {
    return this.cecaPubService.update(+id, updateCecaPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cecaPubService.remove(+id);
  }
}
