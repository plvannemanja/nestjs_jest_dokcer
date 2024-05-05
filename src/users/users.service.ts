import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "../common/entity";
import { RegisterAuthDto } from "../auth/dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async create(dto: RegisterAuthDto): Promise<User> {
    const user = await this.userepository.findOne({
      where: {
        username: dto.username,
      },
    });
    if (user) {
      throw new BadRequestException("User exists");
    }

    const payload: Partial<User> = { ...dto };

    const userEntity = await this.userepository.save(payload);

    return userEntity;
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userepository.findOneById(id);
  }

  async findByName(username: string): Promise<User | undefined> {
    return this.userepository.findOne({
      where: {
        username,
      },
    });
  }

  async deleteUser(id: number): Promise<boolean> {
    await this.userepository.delete(id);
    return true;
  }
}
