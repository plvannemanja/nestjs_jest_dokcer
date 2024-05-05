import { Controller, Post, Body, Request, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBody } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginAuthDto, RegisterAuthDto } from "./dto";
import { LocalAuthGuard } from "../common/guards/local-auth.guard";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginAuthDto })
  @UseGuards(LocalAuthGuard)
  @Post("login")
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("register")
  signUp(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }
}
