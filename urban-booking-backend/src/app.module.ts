import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entity Imports
import { Carpenter } from "./carpenter/entities/carpenter.entity";
import { Slot } from "./slots/entities/slot.entity";
import { Booking } from "./bookings/entities/booking.entity";

// Feature Module Imports
import { CarpentersModule } from "./carpenter/carpenter.module";
import { SlotsModule } from "./slots/slots.module";
import { BookingModule } from "./bookings/booking.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "nitish",
      database: "urban_booking",
      entities: [Carpenter, Slot, Booking],
      synchronize: true, // ⚠️ Turn off in production
    }),

    // Properly use modular structure
    CarpentersModule,
    SlotsModule,
    BookingModule,
  ],
})
export class AppModule {}
