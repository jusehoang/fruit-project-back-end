import { Body, Controller, Delete, Get, HttpCode, Post, Put, Query } from "@nestjs/common";
import { Role, Roles } from "src/@core/decorators/roles.decorator";
import { CategoryRequest, CategoryRequestUpdate } from "src/@core/models/category.model";
import { CategoryService } from "src/@core/services/categoty.service";

@Controller('category')
@Roles(Role.Admin)
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Post()
  @HttpCode(200)
  create(@Body() category: CategoryRequest) {
    return this.categoryService.create(category);
  }

  @Get()
  @HttpCode(200)
  getById(@Query('id') id: string) {
    return this.categoryService.getCategoryById(id);
  }

  @Get('all')
  @HttpCode(200)
  getAll() {
    return this.categoryService.getAllCategory();
  }

  @Put()
  @HttpCode(200)
  update(@Body() category: CategoryRequestUpdate) {
    this.categoryService.update(category);
  }

  @Delete()
  @HttpCode(200)
  delete(@Query('id') id: string) {
    return this.categoryService.remove(id);
  }
}