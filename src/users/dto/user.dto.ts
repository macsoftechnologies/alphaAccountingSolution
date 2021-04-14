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

