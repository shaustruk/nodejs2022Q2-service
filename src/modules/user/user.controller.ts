import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return await this.userService.create(createUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @Put(':id')
  @HttpCode(200)
  async updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDto) {
    return await this.userService.update(id, updateUser);
  }
}
