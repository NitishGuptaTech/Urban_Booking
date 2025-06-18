import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Slot } from "./entities/slot.entity";
import { SlotsService } from "./slots.services";
import { SlotsController } from "./slots.controller";
import { Carpenter } from "src/carpenter/entities/carpenter.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Slot, Carpenter])],
  controllers: [SlotsController],
  providers: [SlotsService],
})
export class SlotsModule {}
