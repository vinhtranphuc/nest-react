import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'common/guards';
import { CategoryService } from '../service/category.service';
import { CategoryDto } from '../dto/category.dto';

@ApiTags('v1/blog')
@Controller({
    path: 'blog/category',
    version: '1'
})
export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getCategories() {
        return this.categoryService.getCategories()
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addCategory(
        @Body() data: CategoryDto,
    ) {
        return this.categoryService.addCategory(data)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateCategory(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() data: CategoryDto
    ) {
        return this.categoryService.updateCategory(id, data)
    }

    // @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteCategory(
        @Param('id', new ParseUUIDPipe()) id: string
    ) {
       return this.categoryService.deleteCategory(id)
    }
}
