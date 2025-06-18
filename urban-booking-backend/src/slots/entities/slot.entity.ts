import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Carpenter } from "src/carpenter/entities/carpenter.entity";
import { Booking } from "src/bookings/entities/booking.entity";

@Entity()
export class Slot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  time: string; // Must be set before save

  @Column({ default: true })
  available: boolean;

  @ManyToOne(() => Carpenter, (carpenter) => carpenter.slots, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "carpenterId" })
  carpenter: Carpenter;

  @Column()
  carpenterId: number;

  @OneToOne(() => Booking, (booking) => booking.slot)
  booking: Booking;

  @Column()
  startTime: string;

  @Column()
  endTime: string;
}
