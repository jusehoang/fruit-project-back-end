import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Brand } from "../entities/brand.entity";
import { BrandRequest, BrandRequestUpdate } from "../models/brand.model";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Brand)
    private readonly categoryRepository: Repository<Brand>
  ) {}

  async create(brandRequest: BrandRequest) {
    const category = this.categoryRepository.create(brandRequest);

    return await this.categoryRepository.save(category);
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new HttpException('Category not found!', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  async getAllCategory() {
    return this.categoryRepository.find();
  }

  async update(brand: BrandRequestUpdate) {
    return await this.categoryRepository.update(brand.id, brand);
  }

  async remove(id: string) {
    return this.categoryRepository.delete(id);
  }
}