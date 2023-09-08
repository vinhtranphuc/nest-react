import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Post, Comment, Tag } from './entities';
import { CategoryController } from './controller/category.controller';
import { CategoryService } from './service/category.service';
import { AuthModule } from '../auth/auth.module';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Post, Comment, Tag]),
        AuthModule
    ],
    controllers: [CategoryController, PostController],
    providers: [CategoryService, PostService],
    exports: []
})
export class BlogModule {}