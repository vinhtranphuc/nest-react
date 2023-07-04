import { Injectable } from "@nestjs/common";
import { CategoryDto } from "../dto/category.dto";

@Injectable()
export class CategoryService {
    // TODO: implement
    addCategory(data: CategoryDto) {
        throw new Error('Method not implemented.');
    }
    deleteCategory(id: string) {
        throw new Error('Method not implemented.');
    }
    updateCategory(id: string, data: CategoryDto) {
        throw new Error('Method not implemented.');
    }
    getCategories() {
        throw new Error('Method not implemented.');
    }
}