import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
  @IsNotEmpty()
  @ApiProperty({ example: "hunter" })
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({ example: "password" })
  @IsString()
  readonly password: string;
}
