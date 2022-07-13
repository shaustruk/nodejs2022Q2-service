import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { validate as uuidValidate } from 'uuid';

@Injectable()
export class UserService {
  private users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findOne(id: string): Promise<User> {
    const user: User = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    } else if (!uuidValidate(id)) {
      throw new BadRequestException("User id isn't valid");
    } else return user;
  }
}
