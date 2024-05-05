import { IsInt, IsString, IsOptional } from "class-validator";

export class UpdateCatDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsInt()
  @IsOptional()
  readonly age?: number;

  @IsString()
  @IsOptional()
  readonly breed?: string;
}
