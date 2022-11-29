import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/category.entity";
import { CategoryRequest, CategoryRequestUpdate } from "../models/category.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(categoryRequest: CategoryRequest) {
    const category = this.categoryRepository.create(categoryRequest);

    return await this.categoryRepository.save(category);
  }

  async getCategoryById(id: string) {
    const category = this.categoryRepository.findOne(id);

    if (!category) {
      throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async getAllCategory() {
    return this.categoryRepository.find();
  }

  async update(category: CategoryRequestUpdate) {
    return await this.categoryRepository.update(category.id, category);
  }

  async remove(id: string) {
    return this.categoryRepository.delete(id);
  }
}