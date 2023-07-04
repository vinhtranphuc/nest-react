import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Post, Comment, Tag } from './entities';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Post, Comment, Tag]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: []
})
export class BlogModule {}