import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { StudentDto } from 'src/users/dto/student.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @HttpCode(200)
  signIn(@Body() createAuthDto: CreateAuthDto, @Req() req) {
  
    return this.authService.signIn(createAuthDto);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('/student/signup')
  @HttpCode(200)
  studentSignUp(@Body() studentDto: StudentDto) {
    return this.authService.studentSignUp(studentDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
