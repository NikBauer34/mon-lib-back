import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from 'src/token/token.module';
import { JwtAuthGuard } from './jwt-auth.guard';
import { MuseumModule } from 'src/museum/museum.module';

@Module({
  imports: [UserModule,
    JwtModule.register({}),
    TokenModule,
    MuseumModule
  ],
  providers: [AuthService, JwtAuthGuard],
  controllers: [AuthController],
  exports: [JwtAuthGuard]
})
export class AuthModule {}
