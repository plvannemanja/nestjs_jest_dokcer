import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserRole } from "../common/types/user-role.enum";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            constructor: jest.fn(),
            login: jest.fn().mockReturnValue({
              access_token: "jwtToken",
            }),
            register: jest.fn().mockReturnValue({
              id: 1,
              username: "username",
              password: "hashedPassword",
              roles: ["admin"],
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("login", () => {
    it("should return access_token", async () => {
      const { access_token } = await controller.login({});
      expect(access_token).toBeTruthy();
      expect(authService.login).toBeCalled();
    });
  });

  describe("register", () => {
    it("should create a new user", async () => {
      expect(
        await controller.signUp({
          username: "username",
          password: "password",
          roles: [UserRole.ADMIN],
        }),
      ).toEqual({
        id: 1,
        username: "username",
        password: "hashedPassword",
        roles: ["admin"],
      });
    });
  });
});
