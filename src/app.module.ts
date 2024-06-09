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
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    MongooseModule.forRoot(`${process.env.db_url}`),
    TokenModule,
    UserModule,
    AuthModule,
    CategoryModule,
    EventModule,
    OrderModule,
    BucketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
