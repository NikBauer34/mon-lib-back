import { Controller, Get, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Пользователь')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get-id')
  getId(@Headers() headers: Record<string, string>) {
    return this.userService.getId(headers.authorization)
  }
}
