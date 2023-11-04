import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MedicineDocument = Medicine & Document;

@Schema()
export class Medicine {
  @Prop()
  entityType: string;

  @Prop()
  ID: string;

  @Prop()
  medicineAilments: string[];

  @Prop()
  medicineDescription: string;

  @Prop()
  medicineSideEffects: string[];

  @Prop()
  riskGroups: string[];
}

export const MedicineSchema = SchemaFactory.createForClass(Medicine);
