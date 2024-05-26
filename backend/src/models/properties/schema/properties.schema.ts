import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { Users } from 'src/models/users/schema/users.schema';

@Schema({ timestamps: true })
export class Property {
  @Prop({
    required: true,
    ref: Users.name,
    type: SchemaTypes.ObjectId,
  })
  userId: Types.ObjectId;

  @Prop({ required: true })
  address1: string;

  @Prop()
  address2: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true, length: 6 })
  zipcode: string;

  @Prop({ default: 'India' })
  country: string;

  @Prop({ required: true })
  homeType: string;

  @Prop({ required: true })
  yearBuilt: number;

  @Prop({ required: true, min: 1 })
  finishedSquareFeet: number;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, min: 1 })
  bedrooms: number;

  @Prop({ required: true, min: 1 })
  bathrooms: number;

  @Prop({ required: true, min: 1 })
  totalrooms: number;

  @Prop({ required: true })
  garage: string;

  @Prop([String])
  appliances: string[];

  @Prop()
  description: string;

  @Prop([String])
  files: string;
}

export const PropertySchema = SchemaFactory.createForClass(Property);
