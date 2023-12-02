import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { AssessmentQuestion } from './assessmentQuestions.entity';
import { BaseModel } from 'src/common/entities/baseModel.entity';
import { User } from 'src/users/entities/user.entity';
import { Answers } from './answers.entity';

@Entity()
export class Assessment extends BaseModel {
  @Column({ type: 'varchar', nullable: false })
  topic: string;

  @Column({ type: 'integer', nullable: false })
  numberOfQuestions: number;

  @Column({ type: 'varchar', nullable: false })
  language: string;

  @Column({ type: 'varchar', nullable: false })
  questionType: string;

  @Column({ type: 'varchar', nullable: false })
  method: string;

  @Column({ type: 'integer', nullable: false })
  timeLimit: number;

  @Column({ type: 'varchar', nullable: false })
  instructions: string;

  @OneToMany(
    () => AssessmentQuestion,
    (assessmentQuestion) => assessmentQuestion.assessment,
    {
      cascade: true,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  assessmentQuestions: AssessmentQuestion[];

  @OneToMany(() => Answers, (answers) => answers.assessment,
  //  {
  //   cascade: true,
  //   onUpdate: 'CASCADE',
  //   onDelete: 'CASCADE',
  // }
  )
  // @JoinColumn()
  answer: Answers;

  @ManyToOne(() => User, (user: User) => user.id)
  createdBy: User;
}
