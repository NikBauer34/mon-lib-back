import { Injectable } from '@nestjs/common';
import { utils } from 'xlsx';
import xlsx from 'xlsx'
import { BucketService } from 'src/bucket/bucket.service';
@Injectable()
export class ExcelService {
  constructor(private bucketService: BucketService) {}
  async createOrderXLSX(space: [Date, number, number][], people: [string, string, string][]) {
    const workbook = utils.book_new()
    const dataSheet = utils.json_to_sheet(space)
    utils.book_append_sheet(workbook, dataSheet, 'Space')
    const fileName = await this.bucketService.uploadTable(xlsx.write(workbook, {type: 'buffer', bookType: 'csv'}))
    return fileName
  }
}
