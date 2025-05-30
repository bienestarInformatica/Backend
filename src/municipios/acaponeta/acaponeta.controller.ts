import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AcaponetaService } from './acaponeta.service';
import { UpdateAcaponetaDto } from './dto/update-acaponeta.dto';
import { CreateAcaponetaBeneficiarioDto } from './dto/create-acaponeta-beneficiario.dto';
import { CreateAcaponetaBeneficioDto } from './dto/create-acaponeta-beneficio.dto';
import { CreateAcaponetaDomicilioDto } from './dto/create-acaponeta-domicilio.dto';
import { UpdateAcaponetaCompletoDto } from './dto/update-acaponeta-completo.dto';

@Controller('acaponeta')
export class AcaponetaController {
  constructor(private readonly acaponetaService: AcaponetaService) {}

  @Post()
    async createWithRelation(
      @Body() createBeneficiarioDto: CreateAcaponetaBeneficiarioDto,
      @Body() createBeneficioDto: CreateAcaponetaBeneficioDto,
      @Body() createDomicilioDto: CreateAcaponetaDomicilioDto,
    ): Promise<any> {
      return await this.acaponetaService.createWithRelation(
        createBeneficiarioDto,
        createBeneficioDto,
        createDomicilioDto,
      );
    }
  
    @Post('post-excel')
    async importarExcel(
      @Body() beneficiarios: CreateAcaponetaBeneficiarioDto[],
      @Body() beneficios: CreateAcaponetaBeneficioDto[],
      @Body() domicilios: CreateAcaponetaDomicilioDto[],
    ) {
      try {
        const resultados = await this.acaponetaService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
        return resultados;
      } catch (error) {
        console.error('Error al importar desde Excel:', error);
        throw error;
      }
    }
  
    @Get('all')
    // @Auth(Role.OPERATIVO)
    async findAll(): Promise<any> {
      return this.acaponetaService.findAllWithRelations();
    }
    
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateAcaponetaCompletoDto: UpdateAcaponetaCompletoDto) {
      return this.acaponetaService.update(+id, updateAcaponetaCompletoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.acaponetaService.remove(+id);
    }
}
