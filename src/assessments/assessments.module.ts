import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assessment } from './entities/assessment.entity';
import { AssessmentQuestion } from './entities/assessmentQuestions.entity';
import { AssessmentQuestionOption } from './entities/assessmentQuestionsOption.entity';
import { JwtModule } from '@nestjs/jwt';
import { Answers } from './entities/answers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Answers,
      Assessment,
      AssessmentQuestion,
      AssessmentQuestionOption,
    ]),
    JwtModule
  ],
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
  exports:[AssessmentsService]
})
export class AssessmentsModule {}
