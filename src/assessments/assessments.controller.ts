import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AssessmentsService } from "./assessments.service";
import { CreateAssessmentDto } from "./dto/create-assessment.dto";
import { UpdateAssessmentDto } from "./dto/update-assessment.dto";
import { SendInviteDto } from "./dto/sendInvite.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { AnswerDto } from "./dto/answer.dto";
import { ApiTags } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
@ApiTags("assessment")
@Controller("assessments")
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor("images", 30, {
      storage: diskStorage({
        destination: "./uploads",
        filename(req, file, callback) {
          callback(null, file.originalname);
        },
      }),
    })
  )
  create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createAssessmentDto: CreateAssessmentDto,
    @Request() req
  ) {
    if (typeof createAssessmentDto.assessmentQuestions === "string") {
      createAssessmentDto.assessmentQuestions = JSON.parse(
        createAssessmentDto.assessmentQuestions
      );
    }
    return this.assessmentsService.create(createAssessmentDto, req.user.sub);
  }

  @Post("/invite")
  sendInvite(@Body() sendInviteDo: SendInviteDto) {
    return this.assessmentsService.sendInvite(sendInviteDo);
  }
  @UseGuards(AuthGuard)
  @Get("/results")
  assessmentResults(@Request() req) {
    return this.assessmentsService.getAssessmentResultsByUserId(req.user.sub);
  }

  // @UseGuards(AuthGuard)
  @Get(":assessmentId/result/details/:userId")
  assessmentResultDetails(
    @Param("assessmentId") assessmentId: string,
    @Param("userId") userId: string
  ) {
    return this.assessmentsService.getAssessmentResultDetails(
      assessmentId,
      userId
    );
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.assessmentsService.findByUserId(req.user.sub);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.assessmentsService.findOne(id);
  }
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 30, {
      storage: diskStorage({
        destination: './uploads',
        filename(req, file, callback) {
          // const formatedName = `${file.originalname}-item`;
          callback(null, file.originalname);
        },
      }),
    }),
  )
  update(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
  ) {
   
    if (typeof updateAssessmentDto.assessmentQuestions === 'string') {
      updateAssessmentDto.assessmentQuestions = JSON.parse(
        updateAssessmentDto.assessmentQuestions,
      );
    }
    return this.assessmentsService.update(id, updateAssessmentDto);
  }
  @UseGuards(AuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.assessmentsService.remove(id);
  }
  @UseGuards(AuthGuard)
  @Post("/answer")
  assessmentAnswer(@Body() answerDto: AnswerDto, @Request() req) {
    return this.assessmentsService.assessmentAnswer(answerDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get("/result/:id")
  assessmentResult(@Param("id") id: string, @Request() req) {
    return this.assessmentsService.getAssessmentResult(id, req.user.sub);
  }
}
