import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  createUser(@Body() createUserDTO: CreateUserDTO): Promise<void> {
    return this.authService.createUser(createUserDTO);
  }

  @Post('/signin')
  signIn(@Body() createUserDTO: CreateUserDTO): Promise<{ accesstoken: string }> {
    return this.authService.signIn(createUserDTO);
  }
}
