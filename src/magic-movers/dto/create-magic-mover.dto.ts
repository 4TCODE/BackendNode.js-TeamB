import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateMagicMoverDto {
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @Min(1)
    weightLimit: number;

    @IsNumber()
    @Min(1)
    totalEnergy: number;

    @IsNumber()
    @Min(1)
    rateOfEnergyIncrease: number;
}
