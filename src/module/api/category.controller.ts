import { Body, Controller, Get, HttpCode, Post, Query, UseFilters } from "@nestjs/common";
import { PublicApi } from "src/@core/decorators/public-api.decorator";
import { CategoryRequest } from "src/@core/models/category.model";
import { CategoryService } from "src/@core/services/category.service";

@PublicApi()
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Post()
  @HttpCode(200)
  create(@Body() data: CategoryRequest) {
    return this.categoryService.createCategory(data);
  }

  @Get()
  @HttpCode(200)
  getCategory(@Query('page') page: number, @Query('size') size: number) {
    return this.categoryService.getAllCategory(page, size);
  }
}