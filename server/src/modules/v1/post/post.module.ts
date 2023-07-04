import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Post, Comment, Tag } from './entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Post, Comment, Tag]),
    ],
    controllers: [],
    providers: [],
    exports: []
})
export class PostModule {}