import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../../users/users.service";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, "jwt") {
  private readonly logger: Logger = new Logger(JwtAuthStrategy.name);

  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>("jwtAuth.secret"),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username, roles: payload.roles };
  }
}
