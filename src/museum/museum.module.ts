import { Module } from '@nestjs/common';
import { MuseumService } from './museum.service';
import { MuseumController } from './museum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Museum, MuseumSchema } from './museum.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Museum.name, schema: MuseumSchema}])],
  providers: [MuseumService],
  controllers: [MuseumController],
  exports: [MuseumService]
})
export class MuseumModule {}
