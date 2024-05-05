import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cat } from "../common/entity/cat.entity";
import { CreateCatDto, UpdateCatDto } from "./dto";

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepository: Repository<Cat>,
  ) {}

  create(cat: CreateCatDto): Promise<Cat> {
    return this.catRepository.save(cat);
  }

  findAll(): Promise<Cat[]> {
    return this.catRepository.find({
      order: {
        id: "ASC",
      },
    });
  }

  async fineOne(id: number): Promise<Cat> {
    return this.catRepository.findOneById(id);
  }

  async updateCat(id: number, UpdateCatDto: UpdateCatDto): Promise<Cat> {
    await this.catRepository.update(id, UpdateCatDto);
    return this.catRepository.findOneById(id);
  }

  async deleteCat(id: number): Promise<boolean> {
    await this.catRepository.delete(id);
    return true;
  }

  async clearDatabase(): Promise<void> {
    await this.catRepository.query(`TRUNCATE TABLE CATS  RESTART IDENTITY;`);
  }

  async seedTestData(): Promise<void> {
    // Execute raw SQL queries to insert test data
    await this.catRepository.query(`
      INSERT INTO CATS
      (name, age, breed)
      VALUES
      ('Luna', 1, 'Persian'),
      ('Simba', 2, 'Siamese'),
      ('Bella', 3, 'Abyssinian'),
      ('Leo', 4, 'Bengal')
    `);
  }
}
