import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';

@Injectable()
export class AppointmentsRepository {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async findOne(
    appointmentFilterQuery: FilterQuery<Appointment>,
  ): Promise<Appointment | null> {
    try {
      const appointment = await this.appointmentModel.findOne(
        appointmentFilterQuery,
      );
      return appointment;
    } catch (error) {
      throw new Error('Failed to fetch appointment'); // Handle database error
    }
  }

  async find(
    appointmentFilterQuery: FilterQuery<Appointment>,
  ): Promise<Appointment[]> {
    return this.appointmentModel.find(appointmentFilterQuery);
  }

  async create(appointment: Appointment): Promise<Appointment> {
    const newAppointment = new this.appointmentModel(appointment);
    return newAppointment.save();
  }

  async findOneAndUpdate(
    appointmentFilterQuery: FilterQuery<Appointment>,
    appointment: Partial<Appointment>,
  ): Promise<Appointment> {
    try {
      const updatedAppointment = await this.appointmentModel.findOneAndUpdate(
        appointmentFilterQuery,
        appointment,
        {
          new: true,
        },
      );

      if (!updatedAppointment) {
        throw new Error('Appointment not found'); // Handle when the appointment is not found
      }

      return updatedAppointment;
    } catch (error) {
      throw new Error('Failed to update appointment'); // Handle other errors
    }
  }

  async deleteById(ID: string): Promise<any> {
    return this.appointmentModel.deleteOne({ ID: ID }).exec();
  }
}
