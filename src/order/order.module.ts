import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.model';
import { EventModule } from 'src/event/event.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Order.name, schema: OrderSchema}]), EventModule, UserModule],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
