import { Types } from "mongoose"

export class CreateEventDto {
  readonly title: string
  readonly description: string
  readonly location: string
  readonly imageURL?: string
  readonly startDate?: Date
  readonly endDate?: Date
  readonly price: string
  readonly isFree: Boolean
  readonly category: string
}