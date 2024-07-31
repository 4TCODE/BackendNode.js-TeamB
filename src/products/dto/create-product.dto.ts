import { IsAlphanumeric, IsNumber, Min } from "class-validator";

export class CreateProductDto {
    @IsAlphanumeric()
    name: string;

    @IsNumber()
    @Min(1)
    price: number;

    @IsNumber()
    @Min(1)
    stock: number;
}
