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
import { Doctor } from './schemas/doctor.schema';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get(':ID')
  async getDoctor(@Param('ID') ID: string): Promise<Doctor | HttpException> {
    try {
      const doctor = await this.doctorsService.getDoctorById(ID);
      return doctor;
    } catch (error) {
      // Handle and return appropriate error response
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getDoctors(): Promise<Doctor[]> {
    return this.doctorsService.getDoctors();
  }

  @Post()
  async createDoctor(@Body() createDoctorDto: Doctor): Promise<Doctor> {
    return this.doctorsService.createDoctor(createDoctorDto);
  }

  @Patch(':ID')
  async updateDoctor(
    @Param('ID') ID: string,
    @Body() updateDoctor: Doctor,
  ): Promise<Doctor | HttpException> {
    try {
      const updatedDoctor = {
        ...updateDoctor,
        entityType: 'doctor',
        ID: ID,
      };
      await this.doctorsService.updateDoctor(ID, updatedDoctor);

      return updatedDoctor;
    } catch (error) {
      // Handle and return appropriate error response
      return new HttpException(
        'Failed to update patient',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':ID')
  async deleteDoctor(@Param('ID') ID: string) {
    return this.doctorsService.deleteDoctor(ID);
  }
}
