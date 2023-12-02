import { ApiProperty } from "@nestjs/swagger";
import {IsEmail,IsString} from 'class-validator'

export class CreateAuthDto {
    @ApiProperty({
        required:true,
        name:'email'
    })
    @IsEmail()
    email:string;
    @ApiProperty({
        required:true,
        name:'password'
    })
    @IsString()
    password:string
}
