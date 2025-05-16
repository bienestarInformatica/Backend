import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CocytenPubService } from './cocyten-pub.service';
import { UpdateCocytenPubDto } from './dto/update-cocyten-pub.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/rol.enum';
import { CreateCocytenBeneficiarioDto } from './dto/create-cocyten-beneficiario.dto';
import { CreateCocytenBeneficioDto } from './dto/create-cocyten-beneficio.dto';
import { CreateCocytenDomicilioDto } from './dto/create-cocyten-domicilio.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('cocyten-pub')
export class CocytenPubController {
  constructor(private readonly cocytenPubService: CocytenPubService) {}

  @Post('post')
  @Auth(Role.OPERATIVO)
  async createWithRelation(
    @Body() createBeneficiarioDto: CreateCocytenBeneficiarioDto,
    @Body() createBeneficioDto: CreateCocytenBeneficioDto,
    @Body() createDomicilioDto: CreateCocytenDomicilioDto,
  ): Promise<any> {
    return await this.cocytenPubService.createWithRelation(
      createBeneficiarioDto,
      createBeneficioDto,
      createDomicilioDto,
    );
  }

  @Post('post-excel')
  @Auth(Role.OPERATIVO)
  async importarExcel(
    @Body() beneficiarios: CreateCocytenBeneficiarioDto[],
    @Body() beneficios: CreateCocytenBeneficioDto[],
    @Body() domicilios: CreateCocytenDomicilioDto[],
  ) {
    try {
      const resultados = await this.cocytenPubService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
      return resultados;
    } catch (error) {
      console.error('Error al importar desde Excel:', error);
      throw error;
    }
  }

  @Get()
  @Auth(Role.OPERATIVO)
  async findAll(): Promise<any> {
    return this.cocytenPubService.findAllWithRelations();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cocytenPubService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCocytenPubDto: UpdateCocytenPubDto) {
    return this.cocytenPubService.update(+id, updateCocytenPubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cocytenPubService.remove(+id);
  }
}
