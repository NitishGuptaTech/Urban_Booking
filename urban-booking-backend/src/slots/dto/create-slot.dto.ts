import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateSlotDto {
  @IsNumber()
  @IsNotEmpty()
  carpenterId: number;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;
}
