import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private static users: User[] = [];
  private version = 1;
  private updateAt = 0;

  async findAll(): Promise<User[]> {
    UserService.users.forEach((user) => delete user.password);
    return UserService.users;
  }

  async findOne(id: string): Promise<User> {
    if (!uuidValidate(id)) {
      throw new BadRequestException("User id isn't valid");
    }
    const user: User = UserService.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    delete user.password;
    return user;
  }

  async create(userDTO: CreateUserDto) {
    const id = uuidv4();
    const createdAt = +new Date();
    const updatedAt = this.updateAt === 0 ? +new Date() : this.updateAt;
    const version = this.version;
    const newUser: User = {
      id,
      ...userDTO,
      version,
      createdAt,
      updatedAt,
    };
    UserService.users.push(newUser);
    const copyUser = { ...newUser };
    delete copyUser.password;
    return copyUser;
  }

  async delete(id: string) {
    if (!uuidValidate(id)) {
      console.log(id);
      throw new BadRequestException("User id isn't valid");
    }
    const index: number = UserService.users.findIndex((user) => user.id === id);

    // -1 is returned when no findIndex() match is found
    if (index === -1) {
      throw new NotFoundException('User not found');
    }
    UserService.users.splice(index, 1);
  }

  async update(id: string, updateDTO: UpdateUserDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException("User id isn't valid");
    }
    const user: User = UserService.users.find((user) => user.id === id);
    // -1 is returned when no findIndex() match is found
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const userIndex: number = UserService.users.findIndex(
      (user) => user.id === id,
    );
    if (updateDTO.oldPassword !== user.password) {
      throw new ForbiddenException('Old password is wrong');
    }

    const createdAt = UserService.users[userIndex].createdAt;
    const login = UserService.users[userIndex].login;
    const updatedAt = +new Date();
    const version = UserService.users[userIndex].version + 1;
    const password = updateDTO.newPassword;
    const updatedUser: User = {
      id,
      login,
      version,
      createdAt,
      updatedAt,
      password,
    };

    UserService.users[userIndex] = updatedUser;
    const copyUser = { ...updatedUser };
    delete copyUser.password;
    return copyUser;
  }
}
