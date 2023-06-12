import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

export class RedisIoAdapter extends IoAdapter {
    
    private adapterConstructor: ReturnType<typeof createAdapter>

    async connectToRedis(configService: ConfigService): Promise<void> {
        let pubClient = new Redis({ host: configService.get('REDIS_HOST') || 'localhost', port: 6379})
        let subClient = pubClient.duplicate();
        await Promise.all([pubClient, subClient])
        this.adapterConstructor = createAdapter(pubClient, subClient)
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options)
        server.adapter(this.adapterConstructor)
        return server
    }
}