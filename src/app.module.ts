import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsModule } from './doctor/doctors.module';
import { PatientsModule } from './patient/patients.module';
import { MedicinesModule } from './medicine/medicines.module';
import { AppointmentsModule } from './appointment/appointments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule, ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URL'),
      }),
    }),
    DoctorsModule,
    PatientsModule,
    MedicinesModule,
    AppointmentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
