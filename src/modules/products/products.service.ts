import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Products } from "@entities/products.entity";
import { ProductVariant } from "@entities/products-variant.entity";
import { CreateProductsDto } from "./dto/create-products.dto";
import { Categories } from "@entities/categories.entity";
import { Users } from '@entities/users.entity';
import { UpdateProductsDto } from './dto/update-products.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductService{
    private readonly logger = new Logger(ProductService.name)

    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        @InjectRepository(ProductVariant)
        private variantRepository: Repository<ProductVariant>,
		private dataSource : DataSource
    ){}

    async create(createDto: CreateProductsDto){
		const ds = this.dataSource.createQueryRunner()

		await ds.connect()
		await ds.startTransaction()

		try{
			// find category
			const category = await this.dataSource.getRepository(Categories).findOneBy({ id : createDto.category})
			const user = await this.dataSource.getRepository(Users).findOneBy({ id : createDto.user})

			const product = new Products()
			product.name = createDto.name
			product.code = createDto.code
			product.category = category.id
			product.status =  createDto.status
			product.user = user.id

			await ds.manager.save(product)
			await ds.commitTransaction()

			await this.dataSource.queryResultCache.remove(["Product:all"])
			return product
		} catch(err) {
			await ds.rollbackTransaction()
			throw new BadRequestException(err.message)
		}
	}

    async findAll(){

		return await this.productRepository.find({
			cache: {
				id: "Product:all",
				milliseconds: 600000
			}
		})
	}

    async findOne(id: string){
		return await this.productRepository.findOneBy({
			id: id
		})
	}

    async update(id: string, updateDto: UpdateProductsDto){
		const product = await this.findOne(id)
		product.name = updateDto.name
		product.code = updateDto.code
		product.status = updateDto.status

		await this.dataSource.queryResultCache.remove(["Product:all"])
		return await this.productRepository.save(product)
	}

    async updateStatus(id: string, parms: object){
		await this.dataSource.queryResultCache.remove(["Product:all"])
		return await this.productRepository.update(id, parms)
	}

    async remove(id: string){
		const product = await this.findOne(id)
		await this.dataSource.queryResultCache.remove(["Product:all"])

		return await this.productRepository.remove(product)
	}

    // variant product
    async createVariant(productId : string, variantDto: CreateProductVariantDto){
		const ds = this.dataSource.createQueryRunner()

		await ds.connect()
		await ds.startTransaction()

		try{
			// find category
			const product = await this.productRepository.findOneBy({id: productId})

			const variant = new ProductVariant()
			variant.product = product.id
			variant.sku = variantDto.sku
			variant.name = variantDto.name
			variant.model =  variantDto.model
			variant.price = variantDto.price
			variant.cost = variantDto.cost
			variant.stock = variantDto.stock
			variant.minimum = variantDto.minimum
			variant.unit = variantDto.unit
			variant.description = variantDto.description

			await ds.manager.save(variant)

			await ds.commitTransaction()

			await this.dataSource.queryResultCache.remove(["Variant:all"])
			return product
		} catch(err) {
			await ds.rollbackTransaction()
			throw new BadRequestException(err.message)
		}
	}

	async findAllVariant(){
		return await this.variantRepository.find({
			cache: {
				id: "Variant:all",
				milliseconds: 60000
			}
		})
	}

	async findOneVariant(variantId: string){
		return await this.variantRepository.findOneBy({id: variantId})
	}

    async updateVariant(variantId: string, variantDto: UpdateProductVariantDto){

		const variant = await this.variantRepository.findOneBy({id: variantId})
		variant.sku = variantDto.sku
		variant.name = variantDto.name
		variant.model =  variantDto.model
		variant.price = variantDto.price
		variant.cost = variantDto.cost
		variant.stock = variant.stock + variantDto.stock
		variant.minimum = variantDto.minimum
		variant.unit = variantDto.unit
		variant.description = variantDto.description

		await this.dataSource.queryResultCache.remove(["Variant:all"])
		return await this.variantRepository.save(variant)
	}

	async removeVariant(variantId: string){
		const variant = await this.variantRepository.findOneBy({id: variantId})
		await this.dataSource.queryResultCache.remove(["Variant:all"])

		return await this.variantRepository.remove(variant)
	}
}
