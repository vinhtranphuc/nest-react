import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core'
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis'

import { V1Module } from './v1/v1.module'
import { MainController } from './app.controller'
import { WsEmitterClientOptions, WsEmitterModule } from './v1/chat/ws-emitter.module'
import { DatabaseModule } from './config/database/database.module'
import { MinioClientModule } from './config/minio-client/minio-client.module'
import { FilesModule } from './v1/common/files/files.module'

@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({
            envFilePath: `${process.cwd()}/.env${process?.env?.NODE_ENV?'.'+process?.env?.NODE_ENV:''}`,
            isGlobal: true,
            load: [
                () => ({
                    NODE_ENV: process.env.NODE_ENV,
                })
            ],
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<RedisModuleOptions> => {
                return {
                    config: {
                        host: configService.get('REDIS_HOST') || 'localhost',
                        port: configService.get('REDIS_PORT') || 6379,
                    }
                }
            }
        }),
        WsEmitterModule.registerAsync({
            // imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<WsEmitterClientOptions> => {
                return {
                    config: {
                        host: configService.get('REDIS_HOST') || 'localhost',
                        port: configService.get('REDIS_PORT') || 6379,
                    }
                }
            }
        }),
        MinioClientModule,
        V1Module
    ],
    controllers: [MainController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
          
    ]
})
export class AppModule {}
