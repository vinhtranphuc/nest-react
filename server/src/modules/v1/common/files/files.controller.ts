import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service';
import { BufferedFile } from 'modules/config/minio-client/dto/file.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('v1/common/files')
@Controller({
    path: 'common/files',
    version: '1'
})
export class FilesController {

    constructor(
        private fileService: FilesService
    ) { }

    @Post('upload/single')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
        type: 'object',
        properties: {
            // comment: { type: 'string' },
            // outletId: { type: 'integer' },
            image: {
                type: 'string',
                format: 'binary',
            },
        },
        },
    })
    @UseInterceptors(FileInterceptor('image'))
    async uploadSingle(
        @UploadedFile() image: BufferedFile
    ) {
        return await this.fileService.uploadSingle(image)
    }

    @Post('upload/many')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
    ]))
    async uploadMany(
        @UploadedFiles() files: BufferedFile,
    ) {
        return this.fileService.uploadMany(files)
    }
}