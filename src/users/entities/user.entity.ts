import { Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from 'src/common/entities/baseModel.entity';
import { Answers } from 'src/assessments/entities/answers.entity';

@Entity()
export class User extends BaseModel {
  @Column({ type: 'varchar' })
  firstName: string;
  @Column({ type: 'varchar' })
  lastName: string;
  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar', nullable: true })
  password: string;
  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;
  @Column({ type: 'varchar', nullable: true })
  gender: string;
  @Column({ type: 'int', nullable: true })
  age: number;
  @OneToMany(
    () => Answers,
    (answer) => answer.user,
    //  {
    //   onDelete: 'CASCADE',
    // }
  )
  answer: Answers;
}
