import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
// import { i18nValidationMessage } from "nestjs-i18n";
import { AssessmentQuestion } from "../entities/assessmentQuestions.entity";

export class CreateAssessmentDto {
  @ApiProperty({
    required: true,
    description: "Topic For Exam",
  })
  @IsString()
  @IsNotEmpty({ message: "Topic should not be empty" })
  topic: string;
  @ApiProperty({
    required: true,
    description: "Assessment Question Type",
  })
  @IsString()
  @IsNotEmpty({ message: "QuestionType should not be empty" })
  questionType: string;
  // @ApiProperty({
  //   required: true,
  //   description: "Number of desired questions",
  // })
  // @IsNumber()
  // @IsNotEmpty({ message: "Number of desired question should not be empty" })
  // numberOfQuestions: number;
  @ApiProperty({
    required: true,
    description: "Language for assessment",
  })
  @IsString()
  // @IsNotEmpty({ message: i18nValidationMessage("validation.NOT_EMPTY") })
  language: string;
  @ApiProperty({
    required: true,
    description: "Generate by AI or Manual",
  })
  @IsString()
  // @IsNotEmpty({ message: i18nValidationMessage("validation.NOT_EMPTY") })
  method: string;
  @ApiProperty({
    required: true,
    description: "Time limit for assessment. Should be in minutes",
  })
  @IsNumber()
  // @IsNotEmpty({ message: i18nValidationMessage("validation.NOT_EMPTY") })
  timeLimit: number;

  @ApiProperty({
    required: false,
    description: "Should assessment be part of initial assessment?",
  })
  @IsString({ message: "validation.INVALID_BOOLEAN" })
  instructions: string;

  @ApiProperty({ required: true })
  @IsArray()
  @Type(() => AssessmentQuestion)
  assessmentQuestions: AssessmentQuestion[] | string;
}
