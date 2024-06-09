import { Controller, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('bucket')
export class BucketController {
  constructor(private bucketService: BucketService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    console.log('here')
    console.log(req)
    return this.bucketService.uploadImage(file.buffer, file.originalname)
  }
}
