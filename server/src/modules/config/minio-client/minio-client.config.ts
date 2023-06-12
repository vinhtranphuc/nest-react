
export const minioConfig = {
    MINIO_ENDPOINT: 'localhost',
    MINIO_PORT: 9000,
    // MINIO_ACCESSKEY: 'AKIAIOSFODNN7EXAMPLE',
    // MINIO_SECRETKEY: 'wJalrXUtnFEMIK7MDENGbPxRfiCYEXAMPLEKEY',
    MINIO_ACCESSKEY: 'tpvinh',
    MINIO_SECRETKEY: 'tpvinhminio',
    MINIO_BUCKET: 'test'
}

// import { ConfigService } from "@nestjs/config"
// import { NestFactory } from "@nestjs/core"
// import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express"
// import { AppModule } from "modules/app.module"

// export const minioConfig = async () => {
//     const app = await NestFactory.create<NestExpressApplication>(
//         AppModule,
//         new ExpressAdapter()
//     )
//     const configService = app.get<ConfigService>(ConfigService)
//     return {
//         MINIO_ENDPOINT: configService.get('MINIO_ENDPOINT'),
//         MINIO_PORT: configService.get('MINIO_PORT'),
//         // MINIO_ACCESSKEY: 'AKIAIOSFODNN7EXAMPLE',
//         // MINIO_SECRETKEY: 'wJalrXUtnFEMIK7MDENGbPxRfiCYEXAMPLEKEY',
//         MINIO_ACCESSKEY: configService.get('MINIO_ACCESSKEY'),
//         MINIO_SECRETKEY: configService.get('MINIO_SECRETKEY'),
//         MINIO_BUCKET: configService.get('MINIO_BUCKET')
//     }
// }