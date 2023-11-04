import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop()
  entityType: string;

  @Prop()
  ID: string;

  @Prop()
  name: string;

  @Prop()
  DoB: Date;

  @Prop()
  sex: string;

  @Prop()
  emailID: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  guardianName: string;

  @Prop()
  guardianEmailID: string;

  @Prop()
  guardianPhoneNumber: number;

  @Prop()
  password: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
