import { Injectable } from '@nestjs/common';
import { BufferedFile } from 'modules/config/minio-client/dto/file.dto';
import { MinioClientService } from 'modules/config/minio-client/minio-client.service';

@Injectable()
export class FilesService {

  constructor(
    private minioClientService: MinioClientService
  ) {}

  async uploadSingle(image: BufferedFile) {
    let uploaded_image = await this.minioClientService.upload(image)
    return {
      image_url: uploaded_image.url,
      message: "Successfully uploaded to MinIO S3"
    }
  }

  async uploadMany(files: BufferedFile) {
  
    let image1 = files['image1'][0]
    let uploaded_image1 = await this.minioClientService.upload(image1)

    let image2 = files['image2'][0]
    let uploaded_image2 = await this.minioClientService.upload(image2)
    
    return {
      image1_url: uploaded_image1.url,
      image2_url: uploaded_image2.url,
      message: 'Successfully uploaded mutiple image on MinioS3'
    }
  }
}