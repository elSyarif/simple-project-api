import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreateCategoriesDto {
    @ApiProperty()
    @IsNotEmpty()
    name:string

    @ApiProperty()
    @IsNotEmpty()
    status:string

    @ApiProperty()
    @IsNotEmpty()
    description: string
}