import { Categories } from "@entities/categories.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {UpdateCategoriesDto} from "./dto/update-categories.dto"
import { CreateCategoriesDto } from "./dto/create-categories.dto";

@Injectable()
export class CategoriesService{
    constructor(
        @InjectRepository(Categories)
        private categoriesRepositor: Repository<Categories>
    ){}

    async create(createDto: CreateCategoriesDto){
        const category = new Categories()
        category.name = createDto.name
        category.status = createDto.status
        category.description = createDto.description

        return await this.categoriesRepositor.save(category)
    }

    async findAll(){
        return await this.categoriesRepositor.find()
    }

    async findOne(id: string){
        return await this.categoriesRepositor.findOneBy({
            id: id
        })
    }

    async update(id: string, updateDto: UpdateCategoriesDto){
        const category = await this.findOne(id)
        category.name = updateDto.name
        category.status = updateDto.status
        category.description = updateDto.description

        return await this.categoriesRepositor.save(category)
    }

    async remove(id: string){
        const category = await this.findOne(id)

        return await this.categoriesRepositor.remove(category)
    }
}