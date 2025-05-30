import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SanBlasService } from './san-blas.service';
import { CreateSanBlasBeneficiarioDto } from './dto/create-san-blas-beneficiario.dto';
import { CreateSanBlasBeneficioDto } from './dto/create-san-blas-beneficio.dto';
import { CreateSanBlasDomicilioDto } from './dto/create-san-blas-domicilio.dto';
import { UpdateSanBlasCompletoDto } from './dto/update-san-blas-completo.dto';

@Controller('san-blas')
export class SanBlasController {
  constructor(private readonly sanBlasService: SanBlasService) {}

  @Post()
    async createWithRelation(
      @Body() createBeneficiarioDto: CreateSanBlasBeneficiarioDto,
      @Body() createBeneficioDto: CreateSanBlasBeneficioDto,
      @Body() createDomicilioDto: CreateSanBlasDomicilioDto,
    ): Promise<any> {
      return await this.sanBlasService.createWithRelation(
        createBeneficiarioDto,
        createBeneficioDto,
        createDomicilioDto,
      );
    }
  
    @Post('post-excel')
    async importarExcel(
      @Body() beneficiarios: CreateSanBlasBeneficiarioDto[],
      @Body() beneficios: CreateSanBlasBeneficioDto[],
      @Body() domicilios: CreateSanBlasDomicilioDto[],
    ) {
      try {
        const resultados = await this.sanBlasService.createMultipleWithRelation(beneficiarios, beneficios, domicilios);
        return resultados;
      } catch (error) {
        console.error('Error al importar desde Excel:', error);
        throw error;
      }
    }
  
    @Get('all')
    // @Auth(Role.OPERATIVO)
    async findAll(): Promise<any> {
      return this.sanBlasService.findAllWithRelations();
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSanBlasCompletoDto: UpdateSanBlasCompletoDto) {
      return this.sanBlasService.update(+id, updateSanBlasCompletoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.sanBlasService.remove(+id);
    }
}
