import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CategoryDto } from "../dto/category.dto";
import { Category } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import { PostgresErrorCode } from "common/enums";

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category) 
        private readonly categoryRepository: Repository<Category>
    ) {}
    
    async getCategories() {
        const categories = await this.categoryRepository.find();
        return categories
    }

    async addCategory(data: CategoryDto) {
        if(await this.cntCategoryName(data?.name) > 0) {
            throw new HttpException('Category name already exists!', HttpStatus.BAD_REQUEST)
        }
        return await this.categoryRepository.save(data);
    }

    async deleteCategory(id: string) {
        const cntId = await this.categoryRepository.count({
            select: {
                id: true
            },
            where: {
                id:id
            }
        })
        if(cntId < 1) {
            throw new HttpException('ID not exists!', HttpStatus.BAD_REQUEST)
        }
        try {
           return await this.categoryRepository.delete(id);
        } catch(err) {
            if(err.code == PostgresErrorCode.ForeignKeyViolation) {
                throw new HttpException('This category already exists post!', HttpStatus.BAD_REQUEST)
            }
        }
    }

    async updateCategory(id: string, data: CategoryDto) {
        if(await this.cntCategoryName(data?.name, id) > 0) {
            throw new HttpException('Category name already exists!', HttpStatus.BAD_REQUEST)
        }
        return await this.categoryRepository.save({
            id: id,
            ...data
        });
    }

    async cntCategoryName(categoryName, exceptId?) {
        const result = await this.categoryRepository.count({
            select: {
                id: true
            },
            where: {
                name:categoryName,
                ...(exceptId?{id: Not(exceptId)}:{})
            }
        })
        return result;
    }
}