import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt'
import { User } from 'src/user/user.model';
import { Types } from 'mongoose';
import { TokenService } from 'src/token/token.service';
@Injectable()
export class AuthService {
  constructor(private userService: UserService,
              private jwtService: JwtService,
              private tokenService: TokenService
  ) {}
  async login(dto: CreateUserDto) {
    console.log('here')
    const user = await this.validateUser(dto)
    return this.generateTokens(user)
  }
  async registration(dto: CreateUserDto) {
    const candidate = await this.userService.findByUsername(dto.username)
    if (candidate) {
      throw new HttpException('Пользователь с таким никнеймом существует', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(dto.password, 5)
    const user = await this.userService.create({...dto, password: hashPassword})
    const tokens = await this.generateTokens(user)
    await this.tokenService.saveToken(user._id, tokens.refreshToken)
    return {...tokens}
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      console.log('Рефреш-токена нет')
      throw new UnauthorizedException({message: 'Рефреш-токена нет!'})
    }
    const takenFromDb = await this.tokenService.findToken(refreshToken)
    if (!takenFromDb) {
      console.log('Токена не существует')
      throw new UnauthorizedException({message: 'Такого токена не существует'})
    }
    const userData = await this.jwtService.verify(refreshToken, {secret: 'secret2'})
    console.log(userData)
    const user = await this.userService.findById(userData._id)
    const tokens = await this.generateTokens(user)
    await this.tokenService.saveToken(user._id, tokens.refreshToken)
    console.log('ok')
    return {...tokens}
  }
  private async generateTokens(user: User & {_id: Types.ObjectId}) {
    const payload = {_id: user._id}
    return {
        acccessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1d',
          secret: 'secret1'
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: 'secret2'
        }),
        expiresIn: new Date().setTime(new Date().getTime() + 5 * 60 * 1000),
    }
  }
  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findByUsername(userDto.username);
    if (!user) throw new UnauthorizedException({message: 'Некорректный никнейм или пароль'})
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals) {
        return user;
    }
    throw new UnauthorizedException({message: 'Некорректный никнейм или пароль'})
}
}
