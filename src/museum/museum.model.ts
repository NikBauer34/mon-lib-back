import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MuseumDocument =HydratedDocument<Museum>

@Schema()
export class Museum {
  @Prop()
  username: string

  @Prop()
  password: string
}

export const MuseumSchema = SchemaFactory.createForClass(Museum)