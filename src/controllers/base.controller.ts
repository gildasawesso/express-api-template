import {
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Patch,
} from "routing-controllers";
import { getRepository, Repository, ObjectLiteral } from "typeorm";

export abstract class BaseController {

  repository: Repository<ObjectLiteral>;

  constructor(model: any) {
    this.repository = getRepository(model);
  }

  @Get()
  async getAll() {
    return this.repository.find();
  }

  @Get('/:id')
  async getOne(@Param("id") id: number) {
    return this.repository.findOne(id);
  }

  @Post()
  async post(@Body() model: any) {
    const entity = this.repository.create(model);
    const entityCreated = await this.repository.save(entity);
    return entityCreated;
  }

  @Put('/:id')
  async put(@Param("id") id: number, @Body() model: any) {
    return this.repository.update(id, model);
  }

  @Patch('/:id')
  async patch(@Param("id") id: number, @Body() model: any) {
    return this.repository.update(id, model);
  }

  @Delete('/:id')
  async remove(@Param("id") id: number) {
    const entity = await this.repository.findOne(id);
    return this.repository.delete(entity);
  }
}
