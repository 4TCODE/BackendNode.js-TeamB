import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMagicItemDto {
    @IsNotEmpty()
    name: string;
    
    @IsNumber()
    weight: number;
}
