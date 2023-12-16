import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
// import { BaseModel } from "~/common/entities/baseModel.entity";
// import { QUESTION_TYPE } from "~/common/enums";
import { BaseModel } from "src/common/entities/baseModel.entity";
import { Assessment } from "./assessment.entity";
import { AssessmentQuestionOption } from "./assessmentQuestionsOption.entity";
import { Answers } from "./answers.entity";

@Entity()
export class AssessmentQuestion extends BaseModel {
  @ApiProperty({
    required: false,
    description: "Assessment",
  })
  @Index()
  @ManyToOne(() => Assessment, (assessment) => assessment.id, {
    onDelete: "CASCADE",
  })
  assessment: Assessment;

  @ApiProperty({
    required: false,
    description: "questions",
  })
  @Column({ nullable: false, type: "text" })
  question: string;

  // @ApiProperty({
  //   required: false,
  //   description: "description of a question",
  // })
  // @Column({ nullable: true, type: "text" })
  // description: string;

  // @ApiProperty({
  //   required: false,
  //   description: "Question Type",
  // })
  // @Column({
  //   type: "enum",
  //   enum: QUESTION_TYPE,
  //   default: QUESTION_TYPE.MULTIPLE_CHOICE,
  // })
  // questionType: QUESTION_TYPE;

  @ApiProperty({
    required: false,
    description: "options",
  })
  @OneToMany(
    () => AssessmentQuestionOption,
    (assessmentQuestionOption) => assessmentQuestionOption.assessmentQuestion,
    {
      cascade: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    }
  )
  @JoinColumn()
  assessmentQuestionOptions: AssessmentQuestionOption[];

  @OneToMany(() => Answers, (answers) => answers.question)
  answer: Answers;

  @ApiProperty({
    required: false,
    description: "image for question",
  })
  @Column({ nullable: true })
  image: string;
}
