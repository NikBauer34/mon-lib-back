import { Types } from "mongoose"

export class CreateEventDto {
  readonly title: string
  readonly description: string
  readonly location: string
  readonly imageURL?: string
  readonly price: string
  readonly isFree: Boolean
  readonly category: string
  readonly phone: string
  readonly days: {
    monday: [{startDate: Date, endDate: Date}], 
    tuesday: [{startDate: Date, endDate: Date}], 
    wednesday: [{startDate: Date, endDate: Date}], 
    thursday: [{startDate: Date, endDate: Date}], 
    friday: [{startDate: Date, endDate: Date}], 
    saturday: [{startDate: Date, endDate: Date}], 
    sunday: [{startDate: Date, endDate: Date}]}
}