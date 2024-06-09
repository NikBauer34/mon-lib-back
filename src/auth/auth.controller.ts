import { Body, Controller, Post, Headers, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/registration')
  async registration(@Body() dto: CreateUserDto) {
    console.log(dto)
    return this.authService.registration(dto)
  }
  @Post('/login')
  async login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto)
  }
  @Get('/refresh')
  async refresh(@Headers() headers: Record<string, string>) {
    console.log(headers.authorization)
    return this.authService.refresh(headers.authorization)
  }
}
