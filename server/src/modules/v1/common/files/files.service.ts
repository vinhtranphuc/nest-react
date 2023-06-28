import { Injectable } from '@nestjs/common';
import { BufferedFile } from 'modules/config/minio-client/dto/file.dto';
import { MinioClientService } from 'modules/config/minio-client/minio-client.service';

@Injectable()
export class FilesService {

  constructor(
    private minioClientService: MinioClientService
  ) {}

  async uploadSingle(image: BufferedFile) {
    let uploadedFile = await this.minioClientService.upload(image)
    return {
      fileId: uploadedFile.fileId,
      message: "Successfully uploaded to MinIO S3"
    }
  }

  async uploadMany(files: BufferedFile) {
  
    let file1 = files['file1'][0]
    let uploaded1 = await this.minioClientService.upload(file1)

    let file2 = files['file2'][0]
    let uploaded2 = await this.minioClientService.upload(file2)
    
    return {
      file1Id: uploaded1.fileId,
      file2Id: uploaded2.fileId,
      message: 'Successfully uploaded mutiple image on MinioS3'
    }
  }

  async download(fileId: string) {
    return await this.minioClientService.download(fileId);
  }
}