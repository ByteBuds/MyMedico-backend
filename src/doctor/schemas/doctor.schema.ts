import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
  @Prop()
  entityType: string;

  @Prop()
  ID: string;

  @Prop()
  name: string;

  @Prop()
  DoB: Date;

  @Prop()
  emailID: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  specialization: string;

  @Prop()
  hospitalName: string;

  @Prop()
  hospitalAddress: string;

  @Prop()
  hospitalPhoneNumber: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
