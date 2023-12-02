import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AssessmentQuestion } from './assessmentQuestions.entity';
import { BaseModel } from 'src/common/entities/baseModel.entity';
import { User } from 'src/users/entities/user.entity';
import { Assessment } from './assessment.entity';
import { AssessmentQuestionOption } from './assessmentQuestionsOption.entity';

@Entity()
export class Answers extends BaseModel {
  @ManyToOne(() => Assessment, (assessment) => assessment.id, {
    onDelete: 'CASCADE',
  })
  assessment: Assessment;

  @ManyToOne(
    () => AssessmentQuestion,
    (assessmentQuestion) => assessmentQuestion.id,
  )
  // @JoinColumn()
  question: AssessmentQuestion;

  @ManyToOne(() => AssessmentQuestionOption, (option) => option.id)
  // @JoinColumn()
  option: AssessmentQuestionOption;

  @Column({ default: false })
  isCorrect: boolean;

  @ManyToOne(() => User, (user: User) => user.id)
  user: User;
}
