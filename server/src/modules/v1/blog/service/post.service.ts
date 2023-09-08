import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "../entities";
import { Repository } from "typeorm";
import { PostDto } from "../dto/post.dto";

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post) 
        private readonly postRepository: Repository<Post>
    ) {}

    getPosts() {
        return this.postRepository.find();
    }

    addPost(data: PostDto) {
        throw new Error("Method not implemented.");
    }
}