import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class StudentDto {
  @ApiProperty({
    required: true,
    name: 'firstName',
  })
  @IsString()
  firstName: string;
  @ApiProperty({
    required: true,
    name: 'lastName',
  })
  @IsString()
  lastName: string;
  @ApiProperty({
    required: true,
    name: 'email',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    required: true,
    name: 'isAdmin',
  })
  @IsBoolean()
  isAdmin: boolean;
  @ApiProperty({
    required: true,
    name: 'Gender',
  })
  @IsString()
  gender: string;
  @ApiProperty({
    required: true,
    name: 'age',
  })
  @IsString()
  age: number;
  @ApiProperty({
    required: true,
    name: 'assessmentId',
  })
  @IsString()
  assessmentId:string;
}
