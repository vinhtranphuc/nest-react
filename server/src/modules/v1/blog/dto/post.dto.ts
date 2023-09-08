import { UploadedFiles } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { BufferedFile } from "modules/config/minio-client/dto/file.dto";

export class PostDto {

    @ApiProperty({
        required: true,
        example: 'Post tile',
    })
    @IsNotEmpty({
        message: 'Post title cannot be empty or whitespace'
    })
    @IsString()
    public title: string

    @ApiProperty({
        required: false,
        example: 'summary',
    })
    public summary: string;

    @ApiProperty({
        required: true,
        example: 'Content',
    })
    @IsNotEmpty({
        message: 'Post content cannot be empty or whitespace'
    })
    @IsString()
    public content: string

    public images:BufferedFile[];

    public files:BufferedFile[];

    public tags:string[];
}