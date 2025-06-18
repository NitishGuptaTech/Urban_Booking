import { IsUUID, IsNotEmpty } from "class-validator";

export class BookSlotDto {
  @IsUUID()
  @IsNotEmpty()
  slotId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: number;
}
