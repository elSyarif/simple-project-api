import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	ParseUUIDPipe,
	Patch,
	Post,
	Req,
	Res,
	UseGuards,
	UsePipes,
	ValidationPipe,
	Version
} from "@nestjs/common"
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger"
import { Request, Response } from "express"
import { CategoriesService } from "./categories.service"
import { CreateCategoriesDto } from "./dto/create-categories.dto"
import { JwtAuthGuard } from "@common/guard/jwt-auth.guard"
import { UpdateCategoriesDto } from "./dto/update-categories.dto"

@Controller("categories")
@ApiTags("Categories")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CategoriesController {
	constructor(private categoryService: CategoriesService) {}

	@Post()
	@Version("1")
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new ValidationPipe({ transform: true }))
	async create(
		@Body() createDto: CreateCategoriesDto,
		@Req() req: Request,
		@Res() res: Response
	) {
		const category = await this.categoryService.create(createDto)

		res.json({
			statusCode: HttpStatus.CREATED,
			message: "category create success",
			data: category
		})
	}

	@Get()
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async findAll(@Res() res: Response) {
		const category = await this.categoryService.findAll()

		res.json({
			statusCode: HttpStatus.OK,
			message: "category find success",
			data: category
		})
	}

	@Get(":id")
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async findOne(
		@Param("id", ParseUUIDPipe) id: string,
		@Res() res: Response
	) {
		const category = await this.categoryService.findOne(id)

		res.json({
			statusCode: HttpStatus.OK,
			message: "category find success",
			data: category
		})
	}

	@Patch(":id")
	@Version("1")
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe({ transform: true }))
	async update(
		@Param("id", ParseUUIDPipe) id: string,
		@Body() updateDto: UpdateCategoriesDto,
		@Res() res: Response
	) {
		const category = await this.categoryService.update(id, updateDto)

		res.json({
			statusCode: HttpStatus.OK,
			message: "category update success",
			data: category
		})
	}

	@Delete(":id")
	@Version("1")
	@HttpCode(HttpStatus.OK)
	async remove(
        @Param("id", ParseUUIDPipe) id: string,
        @Res() res: Response
    ) {
        const category = await this.categoryService.remove(id)

		res.json({
			statusCode: HttpStatus.OK,
			message: "category delete success",
			data: category
		})
    }
}
