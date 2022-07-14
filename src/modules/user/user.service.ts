import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { validate as uuidValidate, v4 as uuidv4, version } from 'uuid';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];
  private version = 1;
  private user: User;
  async findAll(): Promise<User[]> {
    this.users.forEach((user) => delete user.password);
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    if (!uuidValidate(id)) {
      throw new BadRequestException("User id isn't valid");
    }
    const user: User = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const copyUser = { ...user };
    delete user.password;
    return user;
  }
  async create(userDTO: CreateUserDto) {
    // if the title is already in use by another post
    // if (userDTO) {
    const id = {
      id: uuidv4(),
    };
    const userVersion = {
      version: this.version++,
    };

    const createdAt = {
      createAt: +new Date(),
    };
    const updatedAt = {
      updatedAt: +new Date(),
    };

    // }
    console.log(id, userVersion, createdAt);
    // this.user = Object.assign(this.user, userDTO);
    // console.log(this.user);
    // this.users.push(this.user);
    const user = Object.assign(
      {},
      userDTO,
      id,
      userVersion,
      createdAt,
      updatedAt,
    );
    console.log(user);
    this.users.push(user);
    return this.user;
  }
}
