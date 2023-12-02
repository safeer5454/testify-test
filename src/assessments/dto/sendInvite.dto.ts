import { ApiProperty } from "@nestjs/swagger";

import { IsArray, IsNotEmpty, IsNumber, IsString,IsEmail } from 'class-validator';

export class SendInviteDto{
    @ApiProperty({
        required:true,
        description:'Assessment Id'
    })
    @IsString()
    @IsNotEmpty({message:'Assessment ID is required'})
    assessmentId:string
    @ApiProperty({
        required:true,
        description:'User Email'
    })
    @IsEmail()
    @IsNotEmpty({message:'Email is required for invite'})
    email:string
}