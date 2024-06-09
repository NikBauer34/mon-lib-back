import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import EasyYandexS3 from 'easy-yandex-s3'
import * as uuid from 'uuid'
import * as path from 'path'
@Injectable()
export class BucketService {
  s3: EasyYandexS3;
  constructor() {
    this.s3 = new EasyYandexS3({
      auth: {
        accessKeyId: 'YCAJESV0A49lEzhUCIA6ZjAJt',
        secretAccessKey: 'YCNiAiNfe6LSBIh3jhM1BYz40ypab-cbfZAeXkOP'
      },
      Bucket: 'unilib-storage',
      debug: process.env.NODE_ENV == 'development' ? true : false
    })
  }
  async uploadImage(file: Buffer, fileName: string) {
    let file_name = uuid.v4() + path.extname(fileName)
    console.log(file_name)
    let upload = await this.s3.Upload({
      buffer: file,
      name: file_name
    },
  '/test/')
    if (!upload) throw new HttpException('Не удалось загрузить файл', HttpStatus.BAD_REQUEST)
    if (upload instanceof Array) return {file_path: upload[0].Location}
    return {file_path: upload.Location}
  }
}
