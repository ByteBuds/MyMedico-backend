import { Appointment } from './schemas/appointment.schema';
import { AppointmentsRepository } from './appointments.repository';
import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';

@Injectable()
export class AppointmentsService {
  constructor(
    private readonly appointmentsRepository: AppointmentsRepository,
  ) {}

  async getAppointmentById(ID: string): Promise<Appointment | null> {
    try {
      const appointment = await this.appointmentsRepository.findOne({ ID });
      if (!appointment) {
        throw new Error(`Appointment with ID ${ID} not found`);
      }
      return appointment;
    } catch (error) {
      throw new Error('Failed to fetch appointment'); // Handle other errors
    }
  }

  async getAppointments(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({});
  }

  async createAppointment(appointment: Appointment): Promise<Appointment> {
    return this.appointmentsRepository.create({
      ...appointment,
      entityType: 'appointment',
      ID: uuid(),
    });
  }

  async updateAppointment(
    ID: string,
    appointmentUpdates: Appointment,
  ): Promise<Appointment> {
    try {
      const newAppointmentUpdates = {
        ...appointmentUpdates,
        ID: ID,
      };
      const updatedPatient = await this.appointmentsRepository.findOneAndUpdate(
        { ID: ID },
        newAppointmentUpdates,
      );

      if (!updatedPatient) {
        throw new Error(`Patient with ID ${ID} not found`); // Handle when the patient is not found
      }

      return updatedPatient;
    } catch (error) {
      throw new Error('Failed to update patient'); // Handle other errors
    }
  }

  async deleteAppointment(ID: string): Promise<string> {
    const result = await this.appointmentsRepository.deleteById(ID);
    if (result.deletedCount && result.deletedCount > 0) {
      return ID;
    } else {
      throw new Error(`Appointment with ID ${ID} not found.`);
    }
  }
}
