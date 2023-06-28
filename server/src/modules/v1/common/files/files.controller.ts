import { Controller, Post, UseInterceptors, UploadedFile, UploadedFiles, Param, Get, Res, Header } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express'
import { FilesService } from './files.service';
import { BufferedFile } from 'modules/config/minio-client/dto/file.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import path from 'path';
import * as fs from 'fs';

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
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadSingle(
        @UploadedFile() file: BufferedFile
    ) {
        return await this.fileService.uploadSingle(file)
    }

    @Post('upload/many')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
    ]))
    async uploadMany(
        @UploadedFiles() files: BufferedFile,
    ) {
        return await this.fileService.uploadMany(files)
    }

    @Get(':fileId')
    async download(@Param('fileId') fileId: string, @Res({passthrough: true}) response) {
        let storedFile = await this.fileService.download(fileId);
        Object.entries(storedFile?.metaData).forEach(([header, value]) => {
            response.setHeader(header, value);
        });
        response.write(storedFile.file);
    }
}