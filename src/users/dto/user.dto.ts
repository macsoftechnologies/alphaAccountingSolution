import { IsString, IsEmail, IsEnum, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UserLogin {
    MobileNum: number
    Email:string
    Password: string
}

export class UserRegister {
    @ApiProperty()
    @IsString()
    UserId: string;

    @ApiProperty()
    @IsString()
    UserName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
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


