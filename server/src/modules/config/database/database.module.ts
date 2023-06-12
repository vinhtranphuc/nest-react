import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigModule } from "./typeorm-config/typeorm-config.module";
import { DefaultTypeOrmConfigService } from "./typeorm-config/default-typeorm-config.service";
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      name: DefaultTypeOrmConfigService.connectionName,
      useExisting: DefaultTypeOrmConfigService
    }),
  ],
})
export class DatabaseModule {}
