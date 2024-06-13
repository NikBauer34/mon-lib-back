import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type MuseumDocument =HydratedDocument<Museum>

@Schema()
export class Museum {
  @Prop()
  title: string
  @Prop()
  username: string

  @Prop()
  password: string

  @Prop()
  description: string

  @Prop()
  descriptionExt: string

  @Prop()
  primaryImage: string

  @Prop({default: [], type: [String]})
  galleryImages: string[]

  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}])
  events: Types.ObjectId[]
}

export const MuseumSchema = SchemaFactory.createForClass(Museum)