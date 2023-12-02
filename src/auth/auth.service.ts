import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { urlencoded } from 'express';
import { StudentDto } from 'src/users/dto/student.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(createAuthDto: CreateAuthDto) {
    const user = await this.userService.findByEmail(createAuthDto.email);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    if (user.isAdmin) {
      const isVerified: boolean = await bcrypt.compare(
        createAuthDto.password,
        user.password,
      );
      if (!isVerified) {
        throw new UnauthorizedException('Email or Password is incorrect');
      }
    }
    
    const payload = { sub: user.id, username: user.email };

    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
    };
    // return 'This action adds a new auth';
  }

  async register(createUserDto: CreateUserDto) {
    const registeredUser = await this.userService.create(createUserDto);
    return registeredUser;
  }

  async studentSignUp(studentDto: StudentDto) {
    const registeredUser = await this.userService.studentSignUp(studentDto);
    return registeredUser;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
