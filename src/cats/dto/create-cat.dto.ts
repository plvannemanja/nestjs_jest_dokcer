import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateCatDto {
  @IsString()
  @ApiProperty({ example: "Luna" })
  readonly name: string;

  @IsInt()
  @ApiProperty({ example: 2 })
  readonly age: number;

  @IsString()
  @ApiProperty({ example: "Persian" })
  readonly breed: string;
}
