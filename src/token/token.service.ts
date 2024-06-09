import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './token.model';
import { Model, Types } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>,
              private jwtService: JwtService) {}

  async saveToken(_id: Types.ObjectId, token: string) {
    const tokenData = await this.tokenModel.findOne({user: _id})
    if (tokenData) {
      tokenData.refreshToken = token
      await tokenData.save()
      return tokenData
    }
    const newToken = await this.tokenModel.create({user: _id, refreshToken: token})
    return token
  }
  validateAccessToken(token: string) {
    try {
        const userData = this.jwtService.verify(token, {secret: 'secret1'})
        return userData;
    } catch (e) {
        return null;
    }
  }

  validateRefreshToken(token:string) {
    try {
      const userData = this.jwtService.verify(token, {secret: 'secret2'})
      return userData;
    } catch (e) {
      return null;
    }
  }
  async findToken(token:string) {
    const db_token = await this.tokenModel.findOne({refreshToken: token})
    return db_token
  }
}
