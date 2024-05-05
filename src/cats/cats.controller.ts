import {
  Body,
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Post,
  UseGuards,
  ParseIntPipe,
  UsePipes,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { CatsService } from "./cats.service";
import { CreateCatDto, UpdateCatDto } from "./dto";
import { ICat } from "./interfaces/cat.interface";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { NotNullPipe } from "../common/pipe/not-null.pipe";
import { Not } from "typeorm";

@ApiBearerAuth()
@ApiTags("Cats")
@UseGuards(RolesGuard)
@UseGuards(JwtAuthGuard)
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(["admin"])
  async create(@Body() createCatDto: CreateCatDto): Promise<ICat> {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<ICat[]> {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(
    @Param("id", new ParseIntPipe())
    id: number,
  ): Promise<ICat> {
    // get by ID logic
    return this.catsService.fineOne(id);
  }

  @Patch(":id")
  @UsePipes(new NotNullPipe())
  update(
    @Param("id", new ParseIntPipe())
    id: number,
    @Body(new NotNullPipe()) body: Partial<CreateCatDto>,
  ): Promise<ICat> {
    return this.catsService.updateCat(id, body);
  }

  @Delete(":id")
  @Roles(["admin"])
  remove(@Param("id") id: number): Promise<boolean> {
    return this.catsService.deleteCat(id);
  }
}
