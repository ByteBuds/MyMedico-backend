import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Patient } from './schemas/patient.schema';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get(':ID')
  async getPatient(@Param('ID') ID: string): Promise<Patient | HttpException> {
    try {
      const patient = await this.patientsService.getPatientById(ID);
      return patient;
    } catch (error) {
      // Handle and return appropriate error response
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getPatients(): Promise<Patient[]> {
    return this.patientsService.getPatients();
  }

  @Post()
  async createPatient(@Body() createPatientDto: Patient): Promise<Patient> {
    return this.patientsService.createPatient(createPatientDto);
  }

  @Patch(':ID')
  async updatePatient(
    @Param('ID') ID: string,
    @Body() updatePatient: Patient,
  ): Promise<Patient | HttpException> {
    try {
      const updatedPatient = {
        ...updatePatient,
        entityType: 'patient',
        ID: ID,
      };
      await this.patientsService.updatePatient(ID, updatedPatient);

      return updatedPatient;
    } catch (error) {
      // Handle and return appropriate error response
      return new HttpException(
        'Failed to update patient',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':ID')
  async deletePatient(@Param('ID') ID: string) {
    return this.patientsService.deletePatient(ID);
  }
}
