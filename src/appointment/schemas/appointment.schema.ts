import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop()
  entityType: string;

  @Prop()
  ID: string;

  @Prop()
  patientID: string;

  @Prop()
  doctorID: string;

  @Prop()
  appointmentDate: Date;

  @Prop()
  ailments: string[];

  @Prop()
  medicinesPrescribed: string[];

  @Prop()
  doctorsRemarks: string;

  @Prop()
  nextAppointmentDate: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
