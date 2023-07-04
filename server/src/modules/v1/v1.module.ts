import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './common/files/files.module';
import { PostModule } from './post/post.module';

@Module({
    imports: [
        FilesModule,
        AuthModule,
        UserModule,
        ChatModule,
        MessageModule,
        RoomModule,
        PostModule,
        ConversationModule
    ]
})
export class V1Module {}
