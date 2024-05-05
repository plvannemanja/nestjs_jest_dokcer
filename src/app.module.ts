import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatsModule } from "./cats/cats.module";
import { CoreModule } from "./core/core.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import configuration from "./common/config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: [".env.development.local", ".env.development"],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const DB_HOST = configService.get<string>("database.host");
        const DB_PORT = configService.get<number>("database.port");
        const DB_NAME = configService.get<string>("database.dbname");
        const DB_USER = configService.get<string>("database.username");
        const DB_PASSWORD = configService.get<string>("database.password");
        const SYNC = configService.get<boolean>("database.synchronize");

        return {
          type: "postgres",
          host: DB_HOST,
          port: DB_PORT,
          username: DB_USER,
          password: DB_PASSWORD,
          database: DB_NAME,
          autoLoadEntities: true,
          synchronize: SYNC,
        };
      },
    }),
    PassportModule.register({ defaultStrategy: "jwt" }),
    CoreModule,
    CatsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
