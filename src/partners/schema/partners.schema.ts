import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { IsString, IsEmail, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true})
export class partners extends Document{
    @Prop({required : true, unique:true , default:uuid})
    UserId: string
    @Prop({required: true})
    ProductId:string
    @Prop({required: true})
    Partners:[{Name:string,
    Age:number,
    MobileNum:number,
    Email:string},
    {Name:string,
        Age:number,
        MobileNum:number,
        Email:string}
     ] 
}
export const PartnersSchema = SchemaFactory.createForClass(partners);