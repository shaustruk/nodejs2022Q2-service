import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(200)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @HttpCode(201)
  async createUser(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.create(createUser);
  }

  // @Delete()
  // @HttpCode(204)
  // async deleteUser() {}

  // @Put('')
  // @HttpCode(200)
  // async updateUser() {}
}
