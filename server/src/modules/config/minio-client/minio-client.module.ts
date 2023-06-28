import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MinioModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
            endPoint: configService.get("MINIO_ENDPOINT"),
            port: parseInt(configService.get("MINIO_PORT")),
            useSSL: (configService.get("MINIO_USESSL") === "true"),
            accessKey: configService.get("MINIO_ACCESSKEY"),
            secretKey: configService.get("MINIO_SECRETKEY")
          }
      },
    })
  ],
  providers: [MinioClientService],
  exports: [MinioClientService]
})
export class MinioClientModule {}

