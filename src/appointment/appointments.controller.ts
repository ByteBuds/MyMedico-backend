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
import { Appointment } from './schemas/appointment.schema';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get(':ID')
  async getAppointment(
    @Param('ID') ID: string,
  ): Promise<Appointment | HttpException> {
    try {
      const appointment = await this.appointmentsService.getAppointmentById(ID);
      return appointment;
    } catch (error) {
      // Handle and return appropriate error response
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getAppointments(): Promise<Appointment[]> {
    return this.appointmentsService.getAppointments();
  }

  @Post()
  async createAppointment(
    @Body() createAppointmentDto: Appointment,
  ): Promise<Appointment> {
    return this.appointmentsService.createAppointment(createAppointmentDto);
  }

  @Patch(':ID')
  async updateAppointment(
    @Param('ID') ID: string,
    @Body() updateAppointment: Appointment,
  ): Promise<Appointment | HttpException> {
    try {
      const updatedAppointment = {
        ...updateAppointment,
        entityType: 'appointment',
        ID: ID,
      };
      await this.appointmentsService.updateAppointment(ID, updatedAppointment);

      return updatedAppointment;
    } catch (error) {
      // Handle and return appropriate error response
      return new HttpException(
        'Failed to update patient',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':ID')
  async deleteAppointment(@Param('ID') ID: string) {
    return this.appointmentsService.deleteAppointment(ID);
  }
}
