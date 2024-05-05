import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtAuthStrategy } from "./strategy/jwt-auth.strategy";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "../common/entity";
import { ConfigService } from "@nestjs/config";
import { UsersModule } from "../users/users.module";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("jwtAuth.secret"),
        signOptions: {
          expiresIn: configService.get<string>("jwtAuth.expiresIn"),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAuthStrategy],
})
export class AuthModule {}
