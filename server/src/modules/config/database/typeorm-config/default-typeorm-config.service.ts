// typeorm-config/default-typeorm-config.service.ts
import { Global, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TYPEORM_CONNECTION_NAMES, TypeOrmConnectionName } from "./constants";

import { TypeOrmLoggerContainer } from "./typeorm-logger.container";
import { User } from "common/entities";
import { Invitation, Room } from "modules/v1/room/entities";
import { Message } from "modules/v1/message/message.entity";
import { Conversation } from "modules/v1/conversation/conversation.entity";

@Global()
@Injectable()
export class DefaultTypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {};

  static connectionName: TypeOrmConnectionName =
    TYPEORM_CONNECTION_NAMES.DEFAULT;
  
  createTypeOrmOptions(): TypeOrmModuleOptions {
    
    return {
      logger: TypeOrmLoggerContainer.ForConnection(
        DefaultTypeOrmConfigService.connectionName,
        "all" 
      ),
      name: DefaultTypeOrmConfigService.connectionName,
      synchronize: true,
      type: 'postgres',
      host: this.configService.get("DB_HOST"),
      port: this.configService.get("DB_PORT"),
      username: this.configService.get("DB_USERNAME"),
      password: this.configService.get("DB_PASSWORD"),
      database: this.configService.get("DB_DATABASE"),
      // entities: [__dirname + "../../../../entities/*{.ts,.js}"],
      entities: [User, Room, Invitation, Message, Conversation],
    };
  }
}