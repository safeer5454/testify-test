import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { AssessmentQuestion } from './assessmentQuestions.entity';
import { BaseModel } from 'src/common/entities/baseModel.entity';
import { Answers } from './answers.entity';

@Entity()
export class AssessmentQuestionOption extends BaseModel {
  @Index()
  @ManyToOne(
    () => AssessmentQuestion,
    (assessmentQuestion) => assessmentQuestion.id,
    {
      onDelete: 'CASCADE',
    },
  )
  assessmentQuestion: AssessmentQuestion;

  // @Column({ default: 1 })
  // order: number;

  @Column({ type: 'text' })
  option: string;

  // @Column({ type: "boolean" })
  // isCorrect: boolean

  @Column({ default: false })
  isCorrect: boolean;

  @OneToMany(() => Answers, (answer) => answer.option, {
    onDelete: 'CASCADE',
  })
  answer: Answers;

  // @Column({ type: "text", nullable: true })
  // key: string;

  // @AfterLoad()
  // @AfterInsert()
  // @AfterUpdate()
  // generateKey(): void {
  //   if (!this.key) {
  //     this.key = this.option.toLowerCase()?.split(" ")?.join("_");
  //   }
  // }
}
