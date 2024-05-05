import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEnum, IsArray } from "class-validator";
import { UserRole } from "../../common/types/user-role.enum";

export class RegisterAuthDto {
  @IsNotEmpty()
  @ApiProperty({ example: "hunter" })
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({ example: "password" })
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ example: ["admin"] })
  @IsArray()
  @IsEnum(UserRole, { each: true })
  readonly roles: UserRole[];
}
