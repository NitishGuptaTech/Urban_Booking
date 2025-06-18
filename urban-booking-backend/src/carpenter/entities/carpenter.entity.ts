import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Slot } from "src/slots/entities/slot.entity";

@Entity()
export class Carpenter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Slot, (slot) => slot.carpenter)
  slots: Slot[];
}
