import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssessmentsModule } from './assessments/assessments.module';
import { UsersModule } from './users/users.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'testify-client',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AssessmentsModule,
    UsersModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: '465',
        secure: true,
        auth: {
          user: 'safeerahmad5454@gmail.com',
          pass: 'gepi mzpt iqau zftc',
        },
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}