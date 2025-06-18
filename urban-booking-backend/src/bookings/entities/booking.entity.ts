import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Slot } from "../../slots/entities/slot.entity";

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @OneToOne(() => Slot, (slot) => slot.booking, { onDelete: "CASCADE" })
  @JoinColumn({ name: "slotId" })
  slot: Slot;

  @Column({ unique: true })
  slotId: number;

  @CreateDateColumn()
  createdAt: Date;
}
