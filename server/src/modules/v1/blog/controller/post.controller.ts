import { Controller, Get, Post, Req} from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { PostService } from "../service/post.service";
import { PostDto } from "../dto/post.dto";
@ApiTags('v1/blog')
@Controller({
    path: 'blog/post',
    version: '1'
})
export class PostController {

    constructor(
        private readonly postService: PostService,
    ) {}

    // @UseGuards(JwtAuthGuard)
    @Get()
    async getPosts() {
        return this.postService.getPosts()
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    async addPost(
        @Req() data: PostDto,
    ) {
        return this.postService.addPost(data)
    }
}