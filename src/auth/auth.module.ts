import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory:()=>({
        global: true,
        secret: "24fXvU2Tjg524.ARRUbMmY3.VxxqESqoDG", //for testing purpose will be replaced by env 
        signOptions: { expiresIn: '30 days' },
      })
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports:[AuthService]
})
export class AuthModule {}
