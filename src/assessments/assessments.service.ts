import { HttpStatus, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, In, Repository, getManager } from 'typeorm';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Assessment } from './entities/assessment.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { SendInviteDto } from './dto/sendInvite.dto';
import * as postmark from 'postmark';
import { AnswerDto } from './dto/answer.dto';
import { Answers } from './entities/answers.entity';

@Injectable()
export class AssessmentsService {
  private client: postmark.ServerClient;
  constructor(
    private dataSource: DataSource,
    @InjectRepository(Assessment)
    private assessmentRepository: Repository<Assessment>,
    private readonly mailerService: MailerService,
    @InjectRepository(Answers)
    private answerRepository: Repository<Answers>,
  ) {
    this.client = new postmark.ServerClient(
      '701b853e-3624-4763-bd5b-5ae99d8aa0f7',
    );
  }

  async create(createAssessmentDto: CreateAssessmentDto, userId: string) {
    const newAssessment = this.assessmentRepository.create({
      ...createAssessmentDto,
      numberOfQuestions: createAssessmentDto.assessmentQuestions.length,
      createdBy: { id: userId },
    });
    const assessmentCreated =
      await this.assessmentRepository.save(newAssessment);

    return assessmentCreated;
  }

  async sendInvite(sendInviteDto: SendInviteDto) {
    // Instead of SendGrid I signed up with Postmark. Here is the API key: 701b853e-3624-4763-bd5b-5ae99d8aa0f7
    const emailContent = `
    <p>
      <b>${sendInviteDto.assessmentId} you have been invited for this quiz. Click the link below to take the assessment:</b>
    </p>
    <p>
      <a href="https://master.d29aygk1p5g97c.amplifyapp.com/assessmentLogin?id=${sendInviteDto.assessmentId}" style="display: inline-block; padding: 10px 20px; background-color: #0a2366; color: #fff; text-decoration: none; border-radius: 5px;">Take Assessment</a>
    </p>
  `;
try {
  this.mailerService.sendMail({
    to: sendInviteDto.email,
    from: 'abc@gmail.com',
    subject: 'Testing email service',
    text: 'Welcome to testify-client application', // You can provide a plain text version as well
    html: emailContent,
  });
  return 'invite sent successfully'
} catch (error) {
  throw new UnprocessableEntityException({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    error: "something bad happened with invite",
  });
}
    
//FIXME: will use postmark for sending emails in prod
    // this.mailerService.sendMail({
    //   to: sendInviteDto.email,
    //   from: 'safeerahmad5454@gmail.com',
    //   subject: 'testing email service',
    //   text: 'welcome',
    //   html: `<b>${sendInviteDto.assessmentId} you have been invited for this quiz click the link to take assessment </b>`,
    // });
    // const email = {
    //   from: 'safeerahmad@gmail.com',
    //   to: sendInviteDto.email,
    //   subject: 'Testing email service',
    //   text: 'WELCOME',
    //   html: `<b>${sendInviteDto.assessmentId} you have been invited for this quiz</b>`,
    // };
    // console.log(inviteUserDTO)
    // return this.client.sendEmail({
    //   From: 'safeer@gmail.com',
    //   Subject: 'TESTING',
    //   To: sendInviteDto.email,
    //   TextBody: `<b>${sendInviteDto.assessmentId} you have been invited for this quiz</b>`,
    // });
  }

  async findAll() {
    return await this.assessmentRepository.find({
      relations: { assessmentQuestions: { assessmentQuestionOptions: true } },
    });
  }

  async findByUserId(id:string) {
    return await this.assessmentRepository.find({
      where:{createdBy:[{id:id}]},
      relations: { assessmentQuestions: { assessmentQuestionOptions: true } },
    });
  }

  async findOne(id: string) {
    return await this.assessmentRepository.findOne({
      where: { id },
      relations: {
        assessmentQuestions: { assessmentQuestionOptions: true },
        createdBy: true,
      },
    });
  }

  async update(id: string, updateAssessmentDto: UpdateAssessmentDto) {
    const existingAssessment = await this.findOne(id);
    if (!existingAssessment) {
      throw new NotFoundException("Assessment Doesn't exist");
    }
    const updatedAssessment = { ...existingAssessment };
    updatedAssessment.assessmentQuestions =
      updateAssessmentDto.assessmentQuestions;

    const savedAssessment =
      await this.assessmentRepository.save(updatedAssessment);

    return savedAssessment;
  }

  async remove(id: string) {
    return await this.assessmentRepository.delete({ id });
  }
  async assessmentAnswer(answerDto: AnswerDto, userId: string) {
    const newAssessment = this.answerRepository.create({
      ...answerDto,
      user: { id: userId },
    });
    const assessmentCreated = await this.answerRepository.save(newAssessment);
    return assessmentCreated;
  }
  async getAssessmentResult(assessmentId: string, userId: string) {
    const result = await this.answerRepository.find({
      where: { assessment: { id: assessmentId }, user: { id: userId } },
      relations: { question: true },
      select: { question: { question: true }, isCorrect: true },
    });
    const formattedData = result.map((item) => ({
      isCorrect: item.isCorrect,
      question: item.question.question, // Extracting the question string from the nested object
    }));
    let isCorrectCount = 0;
    const percentage = result.map(
      (resultRecord) => resultRecord.isCorrect && isCorrectCount++,
    );
    return {
      result: formattedData,
      percentage: Math.round((isCorrectCount / result.length) * 100),
    };
  }

  async checkIfUserAlreadyTakenAssessment(
    assessmentId: string,
    userId: string,
  ) {
    const result = await this.answerRepository.find({
      where: { assessment: { id: assessmentId }, user: { id: userId } },
      relations: { question: true },
      select: { question: { question: true }, isCorrect: true },
    });
    const isTaken = result.length > 0;
    return isTaken;
  }
  async getAssessmentResultsByUserId(userId: string) {
    const assessmentsByUser = await this.assessmentRepository.find({
      where: { createdBy: { id: userId } },
      relations: { assessmentQuestions: true },
      select: { id: true, assessmentQuestions: { id: true } },
    });
    const assessmentIds = assessmentsByUser.map((assessment) => assessment.id);
    const data = await this.dataSource.manager.query(
      `SELECT answer."assessmentId",COUNT(answer."assessmentId") as numberOfAnswers,
      answer."userId",CONCAT(usr."firstName", ' ', usr."lastName") AS name,
      count(CASE answer."isCorrect" WHEN TRUE then 1 else null end) AS correctAnswers, 
      ROUND((COUNT(CASE WHEN answer."isCorrect" THEN 1 ELSE NULL END)::decimal / ass."numberOfQuestions" * 100),0) AS percentage,
      ass."numberOfQuestions", ass."topic",
      CASE WHEN COUNT(answer."assessmentId") = ass."numberOfQuestions" THEN 'complete' ELSE 'Incomplete' END AS status, 
      ass."questionType" FROM answers AS answer
      JOIN "user" AS usr ON answer."userId" = usr.id 
      JOIN "assessment" AS ass ON answer."assessmentId" = ass.id 
      WHERE answer."assessmentId" = ANY($1) 
      GROUP BY answer."assessmentId", answer."userId",
      usr."firstName", ass."numberOfQuestions",
      ass."topic", usr."lastName", ass."questionType"`,
      [assessmentIds],
    );
    return data;
  }
  async getAssessmentResultDetails(assessmentId: string, userId: string) {
    const data = await this.dataSource.manager.query(
      `SELECT answer."assessmentId",COUNT(answer."assessmentId") as numberOfAnswers,
      answer."userId",CONCAT(usr."firstName", ' ', usr."lastName") AS name,
      count(CASE answer."isCorrect" WHEN TRUE then 1 else null end) AS correctAnswers, 
      ROUND((COUNT(CASE WHEN answer."isCorrect" THEN 1 ELSE NULL END)::decimal / ass."numberOfQuestions" * 100),0) AS percentage,
      ass."numberOfQuestions", ass."topic",
      CASE WHEN COUNT(answer."assessmentId") = ass."numberOfQuestions" THEN 'complete' ELSE 'Incomplete' END AS status, 
      ass."questionType", usr."email", ass."method" FROM answers AS answer
      JOIN "user" AS usr ON answer."userId" = usr.id 
      JOIN "assessment" AS ass ON answer."assessmentId" = ass.id 
      WHERE answer."assessmentId" = ($1) AND answer."userId" =($2)
      GROUP BY answer."assessmentId", answer."userId",
      usr."firstName", ass."numberOfQuestions",
      ass."topic", usr."lastName", usr."email", ass."questionType", ass."method"`,
      [assessmentId, userId],
    );

    // FIXME: Need to handle the  null values, for unanswered questions by user
    const userResultQuestions = await this.dataSource.manager.query(
      `SELECT   answer."id",
      questions."question",
      userOption."option" AS "userSelectedOption",
      userOption."isCorrect" AS "userIsCorrect",
      correctOption."option" AS "correctOption"
      FROM assessment_question AS questions
      LEFT JOIN "answers" AS answer ON questions."id" = answer."questionId" AND answer."userId" = ($2)
      LEFT JOIN "assessment_question_option" AS userOption ON answer."optionId" = userOption."id"
      LEFT JOIN "assessment_question_option" AS correctOption ON questions."id" = correctOption."assessmentQuestionId" AND correctOption."isCorrect" = true
      WHERE questions."assessmentId" = ($1)`,
      [assessmentId, userId],
    );

    return {
      result: data[0],
      answers: userResultQuestions,
    };
  }
}
