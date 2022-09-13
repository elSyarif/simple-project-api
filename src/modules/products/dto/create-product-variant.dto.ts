export class CreateProductVariantDto{
    product: string
    sku: string
    name: string
    model: string
    price: number
    cost: number
    stock: number
    minimum: number
    unit: string
    description?: string
}