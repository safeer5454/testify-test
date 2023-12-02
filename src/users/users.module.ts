import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentsModule } from 'src/assessments/assessments.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AssessmentsModule),
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret:"24fXvU2Tjg524.ARRUbMmY3.VxxqESqoDG", // for testing purpose
        signOptions: { expiresIn: '30 days' },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
