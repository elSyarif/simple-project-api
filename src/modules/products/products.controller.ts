import { Controller, Delete, Get, HttpCode, Patch, Post, UseGuards, Version, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';

@Controller('products')
@ApiTags("Products")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductsController {

	constructor(){}

	@Post()
	@Version("1")
	@HttpCode(HttpStatus.CREATED)
	async create(){}

	@Get()
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async findAll(){}

	@Get(":id")
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async findOne(){}

	@Patch(":id")
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async update(){}

	@Delete(":id")
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async remove(){}

	// variant
	@Post(":productId/variant")
	@Version("1")
	@HttpCode(HttpStatus.CREATED)
	async createVariant(){}

	@Get("")
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async findAllVariant(){}

	@Get(":productId/variant/:id")
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async findOneVariant(){}

	@Patch(":id")
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async updateVariant(){}

	@Delete(":id")
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async removeVariant(){}
}
