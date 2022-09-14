import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { CreateProductVariantDto } from "./create-product-variant.dto"

export class CreateProductsDto{
    @ApiProperty()
    @IsNotEmpty()
    category: string
    
    @ApiProperty()
    @IsNotEmpty()
    code: string
    
    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    status: string

    user?: string

    @ApiProperty({
        type: [CreateProductVariantDto]
    })
    variant?: Variant[]
}

interface Variant{
    product?: string
    sku: string,
    name: string,
    model: string,
    price: number,
    cost: number,
    stock: number,
    minimum: number
    unit: string
    description?: string
}