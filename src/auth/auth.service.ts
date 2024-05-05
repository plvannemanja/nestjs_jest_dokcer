import { Injectable } from "@nestjs/common";
import { compareSync, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { RegisterAuthDto } from "./dto";
import { User } from "../common/entity";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findByName(username);
    if (!user) {
      return null;
    }
    const isMatch: boolean = compareSync(pass, user.password);
    if (!isMatch) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, id: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(dto: RegisterAuthDto) {
    const hashedPass = await hash(
      dto.password,
      this.configService.get<number>("jwtAuth.saltRounds"),
    );
    const user = await this.usersService.create({
      ...dto,
      password: hashedPass,
    });
    return user;
  }
}
