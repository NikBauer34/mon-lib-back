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
  async login(@Body() dto: {username: string, password: string, role: 'museum' | 'user'}) {
    console.log('here')
    return this.authService.login(dto)
  }
  @Post('/refresh')
  async refresh(@Body() dto: {refreshToken: string, role: string}) {
    return this.authService.refresh(dto.refreshToken, dto.role)
  }
}
