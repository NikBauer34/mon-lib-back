import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";

export type MuseumDocument =HydratedDocument<Museum>

@Schema()
export class Museum {
  @Prop()
  username: string

  @Prop()
  password: string

  @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Event'}])
  events: Types.ObjectId[]
}

export const MuseumSchema = SchemaFactory.createForClass(Museum)