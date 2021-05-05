import { IsString, IsEmail, IsEnum, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserLogin {
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    MobileNum: number
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    Email: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Password: string
}

export class UserRegister {
    @ApiProperty()
    
    UserId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    UserName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    MobileNum:number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    Password: string;
}

export class MobileNumberDto {
    @ApiProperty()
    @IsString()
    MobileNum: number;
  }

export class OtpNumber {
    otp: "12345";
}

export class VerifyOtpDto {
    @ApiProperty()
    @IsString()
    mobileNumber: string;
  
    @ApiProperty()
    @IsString()
    otp: string;
}

export class UserUpdate {
    UserId : string
    Email : string
    Mobile : string

}

export class DeleteUser{
    DeleteType : string
    UserId:string
    }

export class updateUser{
    UserId :string
    UserName : string
    Email : string
    MobileNum : number
    Password : string 
    
}

export class user_Id{
    UserId: string
}