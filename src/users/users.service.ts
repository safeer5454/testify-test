import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { StudentDto } from './dto/student.dto';
import { JwtService } from '@nestjs/jwt';
import { AssessmentsService } from 'src/assessments/assessments.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private assessmentService:AssessmentsService
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('User already exist');
    }
    const { firstName, lastName, email,isAdmin } = createUserDto;
    if (createUserDto.isAdmin) {
      //Hashing password

      const hashPassword = await bcrypt.hash(createUserDto.password, 10);

      const newAssessment = this.userRepository.create({
        firstName,
        lastName,
        email,
        password: hashPassword,
        isAdmin:isAdmin
      });

      const { password, ...user } =
        await this.userRepository.save(newAssessment);

      return user;
    }
    const newAssessment = this.userRepository.create({
      firstName,
      lastName,
      email,
    });

    const user = await this.userRepository.save(newAssessment);
    return user;
  }

  async studentSignUp(studentDto: StudentDto) {
    const existingUser = await this.findByEmail(studentDto.email);
    if(existingUser){
     const isTaken= await  this.assessmentService.checkIfUserAlreadyTakenAssessment(studentDto.assessmentId,existingUser?.id)
     if(isTaken){
      throw new ConflictException("You cannot attempt assessment twice")
     }
    }

    if (existingUser) {
      const payload = { sub: existingUser.id, username: existingUser.email };
      return {
        ...existingUser,
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    const { firstName, lastName, email, age, gender, isAdmin } = studentDto;
    const newAssessment = this.userRepository.create({
      firstName,
      lastName,
      email,
      age,
      gender,
      isAdmin,
    });

    const user = await this.userRepository.save(newAssessment);
    const payload = { sub: user.id, username: user.email };
    
    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { id } });

    const updatedUser = await this.userRepository.merge(
      existingUser,
      updateUserDto,
    );
    try {
      const newUpdateUser = await this.userRepository.create(updatedUser);
      const newUser = await this.userRepository.save(newUpdateUser);
      return newUser;
    } catch (error) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: JSON.stringify(error),
      });
    }
  }

  remove(id: string) {
    return this.userRepository.delete({ id });
  }
}
