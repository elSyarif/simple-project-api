import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Products } from "@entities/products.entity";
import { ProductVariant } from "@entities/products-variant.entity";
import { CreateProductsDto } from "./dto/create-products.dto";

@Injectable()
export class ProductService{
    private readonly logger = new Logger(ProductService.name)

    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        @InjectRepository(ProductVariant)
        private variantRepository: Repository<ProductVariant>
    ){}

    async create(createDto: CreateProductsDto){}

    async findAll(){}

    async findOne(){}

    async update(){}
    
    async remove(){}

    // variant product
    async createVariant(){}
        
    async updateVariant(){}
}