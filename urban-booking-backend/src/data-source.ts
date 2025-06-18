import { DataSource } from "typeorm";
import { Booking } from "./bookings/entities/booking.entity";
import { Slot } from "./slots/entities/slot.entity";
import { Carpenter } from "./carpenter/entities/carpenter.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "nitish", // ⬅️ Update this
  database: "urban_booking", // ⬅️ Update this
  synchronize: false,
  logging: false,
  entities: [Booking, Slot, Carpenter],
  migrations: ["src/migrations/*.ts"],

  subscribers: [],
});
