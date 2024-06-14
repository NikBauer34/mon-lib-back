import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { BucketModule } from 'src/bucket/bucket.module';

@Module({
  imports: [BucketModule],
  providers: [ExcelService],
  exports: [ExcelService]
})
export class ExcelModule {}
