import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { IsString, IsEmail, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { v4 as uuid } from 'uuid';
@Schema({ timestamps: true })
export class Users extends Document{
    @Prop({required : true , unique:true , default : uuid})
    UserId: string
    @Prop({required : true})
    UserName : string
    @Prop({required : true})
    Email : string
    @Prop({required: true})
    MobileNum : number
    @Prop({required : true})
    Password : string
   
    @Prop()
    otp: string;
  
    @Prop()
    otpExpiryTime: string;

    @Prop({ default: false })
    @IsOptional()
    isDeleted?: boolean;
}
export const  UsersSchema = SchemaFactory.createForClass(Users);