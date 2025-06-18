import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { CarpentersService } from './carpenters.service';
// import { CarpentersController } from './carpenters.controller';
import { Carpenter } from "./entities/carpenter.entity";
import { CarpentersController } from "./carpenter.controller";
import { CarpentersService } from "./carpenter.service";

@Module({
  imports: [TypeOrmModule.forFeature([Carpenter])],
  controllers: [CarpentersController],
  providers: [CarpentersService],
  exports: [CarpentersService],
})
export class CarpentersModule {}
