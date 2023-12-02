import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
} from 'class-validator';
// import { i18nValidationMessage } from "nestjs-i18n";
import { AssessmentQuestion } from '../entities/assessmentQuestions.entity';
import { Assessment } from '../entities/assessment.entity';
import { AssessmentQuestionOption } from '../entities/assessmentQuestionsOption.entity';
import { User } from 'src/users/entities/user.entity';

export class AnswerDto {
  @ApiProperty({ required: true, type: () => Assessment })
  //   @IsArray()
  @Type(() => Assessment)
  // @ValidateNested()
  assessment: Assessment;
  @ApiProperty({ required: true, type: () => Assessment })
  //   @IsArray()
  @Type(() => AssessmentQuestion)
  // @ValidateNested()
  question: AssessmentQuestion;
  @ApiProperty({ required: true, type: () => Assessment })
  //   @IsArray()
  @Type(() => AssessmentQuestionOption)
  // @ValidateNested()
  option: AssessmentQuestionOption;
  //   @ApiProperty({ required: true })
  //   @IsArray()
  //   @Type(() => User)
  //   // @ValidateNested()
  //   readonly user: User[];

  @ApiProperty({
    required: false,
    description: 'Does Answer is correct',
  })
  @IsBoolean()
  isCorrect: boolean;
}

// import { ApiProperty } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
// import {
//   IsArray,
//   IsNotEmpty,
//   IsNumber,
//   IsString,
//   IsBoolean,
// } from 'class-validator';
// // import { i18nValidationMessage } from "nestjs-i18n";
// import { AssessmentQuestion } from '../entities/assessmentQuestions.entity';
// import { Assessment } from '../entities/assessment.entity';
// import { AssessmentQuestionOption } from '../entities/assessmentQuestionsOption.entity';
// import { User } from 'src/users/entities/user.entity';

// export class AnswerDto {
//   @ApiProperty({ required: true, type: Assessment })
//   assessment: Assessment;
//   @ApiProperty({ required: true, type: AssessmentQuestion })
//   question: AssessmentQuestion;
//   @ApiProperty({ required: true, type: AssessmentQuestionOption })
//   option: AssessmentQuestionOption;
//   @ApiProperty({
//     required: false,
//     description: 'Does Answer is correct',
//   })
//   @IsBoolean()
//   isCorrect: boolean;
// }
