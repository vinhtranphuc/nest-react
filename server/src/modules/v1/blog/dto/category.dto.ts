import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CategoryDto {

    @ApiProperty({
        required: true,
        example: 'Food',
    })
    @IsNotEmpty({
        message: 'Category name cannot be empty or whitespace'
    })
    @IsString()
    name: string

    @ApiProperty({
        required: false,
        example: 'description',
    })
    public description: string;
}