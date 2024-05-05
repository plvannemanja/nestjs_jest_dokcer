import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { AuthService } from "../../src/auth/auth.service";
import { UsersService } from "../../src/users/users.service";
import { User } from "../../src/common/entity";
import { UsersModule } from "../../src/users/users.module";

describe("Auth", () => {
  let app: INestApplication;
  let usersService: UsersService;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, TypeOrmModule.forFeature([User]), UsersModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    authService = moduleRef.get<AuthService>(AuthService);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it("should create a new user", async () => {
    let user: User | undefined = await usersService.findByName("username");
    if (user !== undefined && user !== null)
      await usersService.deleteUser(user.id);
    const resgisterReq = await request(app.getHttpServer())
      .post("/auth/register")
      .send({ username: "username", password: "password", roles: ["admin"] })
      .expect(201);
  });

  it("should get a JWT token", async () => {
    const loginReq = await request(app.getHttpServer())
      .post("/auth/login")
      .send({ username: "username", password: "password" })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
