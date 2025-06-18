import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Carpenter } from "./carpenter/entities/carpenter.entity";
import { Slot } from "./slots/entities/slot.entity";
import { Booking } from "./bookings/entities/booking.entity";
import { CarpentersService } from "./carpenter/carpenter.service";
import { SlotsService } from "./slots/slots.services";
import { BookingService } from "./bookings/booking.service";
import { CarpentersController } from "./carpenter/carpenter.controller";
import { SlotsController } from "./slots/slots.controllers";
import { BookingController } from "./bookings/booking.controller";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost", // 👈 or your remote host
      port: 5432,
      username: "postgres", //DB username
      password: "nitish", //DB password
      database: "urban_booking", // 👈 replace with your DB name
      entities: [Carpenter, Slot, Booking],
      synchronize: true, // ⚠️ Auto-create tables. Turn off in production.
    }),
    TypeOrmModule.forFeature([Carpenter, Slot, Booking]),
  ],
  controllers: [CarpentersController, SlotsController, BookingController],
  providers: [CarpentersService, SlotsService, BookingService],
})
export class AppModule {}
