import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CatsController } from "./cats.controller";
import { CatsService } from "./cats.service";
import { ICat } from "./interfaces/cat.interface";
import { Cat } from "../common/entity/cat.entity";
import { NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { UpdateCatDto } from "./dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";

describe("CatsController", () => {
  let catsController: CatsController;
  let catsService: CatsService;
  let catsRepository: Repository<Cat>;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        CatsService,
        {
          provide: getRepositoryToken(Cat),
          useValue: {
            find: jest.fn().mockResolvedValue([
              { id: 1, name: "Luna", age: 1, breed: "Persian" },
              { id: 2, name: "Simba", age: 2, breed: "Siamese" },
              { id: 3, name: "Bella", age: 3, breed: "Abyssinian" },
              { id: 4, name: "Leo", age: 4, breed: "Bengal" },
            ]),
            findOneById: jest.fn().mockResolvedValue({
              id: 1,
              name: "Luna",
              age: 1,
              breed: "Persian",
            }),
            create: jest.fn().mockReturnValue({
              id: 1,
              name: "Luna",
              age: 1,
              breed: "Persian",
            }),
            save: jest.fn().mockReturnValue({
              id: 1,
              name: "Luna",
              age: 1,
              breed: "Persian",
            }),
            update: jest.fn().mockReturnValue({
              id: 1,
              name: "Luna",
              age: 1,
              breed: "Persian",
            }),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    catsService = moduleRef.get<CatsService>(CatsService);
    catsController = moduleRef.get<CatsController>(CatsController);
    catsRepository = moduleRef.get<Repository<Cat>>(getRepositoryToken(Cat));
  });

  it("should be defined", () => {
    expect(catsController).toBeDefined();
  });

  it("should ensure the JwtAuthGuard is applied to the user method", async () => {
    const guards = Reflect.getMetadata("__guards__", CatsController);
    const guard = new guards[0]();

    expect(guard).toBeInstanceOf(JwtAuthGuard);
  });

  describe("findAll", () => {
    it("should return an array of cats", async () => {
      const result: ICat[] = [
        { id: 1, name: "Luna", age: 1, breed: "Persian" },
        { id: 2, name: "Simba", age: 2, breed: "Siamese" },
        { id: 3, name: "Bella", age: 3, breed: "Abyssinian" },
        { id: 4, name: "Leo", age: 4, breed: "Bengal" },
      ];

      expect(await catsController.findAll()).toEqual(result);
    });
  });

  describe("findOne", () => {
    it("should return a cat by ID", async () => {
      const result: ICat = {
        id: 1,
        name: "Luna",
        age: 1,
        breed: "Persian",
      };

      expect(await catsController.findOne(1)).toEqual(result);
    });

    it("should throw NotFoundException if cat with ID not found", async () => {
      const error = new NotFoundException();
      jest.spyOn(catsRepository, "findOneById").mockRejectedValue(error);

      await expect(catsController.findOne(999)).rejects.toThrowError(error);
    });
  });

  describe("update", () => {
    it("should update a cat", async () => {
      const catData: UpdateCatDto = { name: "Luna", breed: "Persian" };
      const updatedCat = { id: 1, name: "Luna", age: 1, breed: "Persian" };

      expect(await catsController.update(1, catData)).toEqual(updatedCat);
    });
  });

  describe("remove", () => {
    it("should remove a cat", async () => {
      expect(await catsController.remove(1)).toBe(true);
    });
  });
});
