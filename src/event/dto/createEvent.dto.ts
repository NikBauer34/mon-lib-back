import { ApiProperty } from "@nestjs/swagger"
import { Types } from "mongoose"

export class CreateEventDto {
  @ApiProperty({description: 'Название события'})
  readonly title: string
  @ApiProperty({description: 'Описание события'})
  readonly description: string
  @ApiProperty({description: 'Локация события'})
  readonly location: string
  @ApiProperty({description: 'Картинка события'})
  readonly imageURL?: string
  @ApiProperty({description: 'Цена события'})
  readonly price: string
  @ApiProperty({description: 'Ценность события'})
  readonly isFree: Boolean
  @ApiProperty({description: 'Категория события'})
  readonly category: string
  @ApiProperty({description: 'Телефон события'})
  readonly phone: string
  @ApiProperty({description: 'Дни события'})
  readonly days: {
    monday: [{startDate: Date, endDate: Date}], 
    tuesday: [{startDate: Date, endDate: Date}], 
    wednesday: [{startDate: Date, endDate: Date}], 
    thursday: [{startDate: Date, endDate: Date}], 
    friday: [{startDate: Date, endDate: Date}], 
    saturday: [{startDate: Date, endDate: Date}], 
    sunday: [{startDate: Date, endDate: Date}]}
}