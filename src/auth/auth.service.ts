import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const { username, password } = createUserDTO;

    const user = this.userRepository.create({
        username,
        password
    });
    await this.userRepository.save(user);
    return user;
  }
}
