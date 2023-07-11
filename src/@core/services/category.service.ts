import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { CategoryRequest } from "../models/category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async createCategory(data: CategoryRequest) {
    let category;
    try {
      category = await this.categoryRepository.save(data);
    } catch (error) {
      console.log(error);
    }
    return category;
  }
}