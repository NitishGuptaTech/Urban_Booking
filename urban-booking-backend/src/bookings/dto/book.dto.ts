import { IsNumber, IsNotEmpty } from "class-validator";

export class BookSlotDto {
  @IsNumber()
  @IsNotEmpty()
  slotId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
