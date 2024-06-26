import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<void> {
    const { username, password } = createUserDTO;

    const salt = await bcrypt.genSalt();
    const hashedPwd = await bcrypt.hash(password, salt);
    const user = this.userRepository.create({
      username,
      password: hashedPwd,
    });
    try {
      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(`Username ${username} already exists`);
      } else {
        throw new InternalServerErrorException();
      }
    }
    // return user;
  }

  async signIn(createUserDTO: CreateUserDTO): Promise<{ accesstoken: string }> {
    const { username, password } = createUserDTO;
    const isUser = await this.userRepository.findOne({ username });
    if (isUser && (await bcrypt.compare(password, isUser.password))) {
      const payload: JwtPayload = { username };
      const accesstoken: string = await this.jwtService.sign(payload);
      return { accesstoken };
    } else {
      throw new UnauthorizedException(`Please check your creds`);
    }
  }
}
