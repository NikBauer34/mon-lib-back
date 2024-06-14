import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from '@nestjs/config'
import {MongooseModule} from '@nestjs/mongoose'
import { TokenModule } from './token/token.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { EventModule } from './event/event.module';
import { OrderModule } from './order/order.module';
import { BucketModule } from './bucket/bucket.module';
import { MuseumModule } from './museum/museum.module';
import { ExcelModule } from './excel/excel.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    MongooseModule.forRoot(`mongodb://127.0.0.1:27017/nest_tutorialeil`),
    TokenModule,
    UserModule,
    AuthModule,
    CategoryModule,
    EventModule,
    OrderModule,
    BucketModule,
    MuseumModule,
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
