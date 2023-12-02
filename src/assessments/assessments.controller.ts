import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { SendInviteDto } from './dto/sendInvite.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AnswerDto } from './dto/answer.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('assessment')
@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAssessmentDto: CreateAssessmentDto, @Request() req) {
    return this.assessmentsService.create(createAssessmentDto, req.user.sub);
  }

  @Post('/invite')
  sendInvite(@Body() sendInviteDo: SendInviteDto) {
    return this.assessmentsService.sendInvite(sendInviteDo);
  }
  @UseGuards(AuthGuard)
  @Get('/results')
  assessmentResults(@Request() req) {
    return this.assessmentsService.getAssessmentResultsByUserId(req.user.sub);
  }

  // @UseGuards(AuthGuard)
  @Get(':assessmentId/result/details/:userId')
  assessmentResultDetails(@Param('assessmentId') assessmentId:string,@Param('userId') userId:string ){
    return this.assessmentsService.getAssessmentResultDetails(assessmentId,userId);
  }
@UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.assessmentsService.findByUserId(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assessmentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssessmentDto: UpdateAssessmentDto,
  ) {
    return this.assessmentsService.update(id, updateAssessmentDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assessmentsService.remove(id);
  }
  @UseGuards(AuthGuard)
  @Post('/answer')
  assessmentAnswer(@Body() answerDto: AnswerDto, @Request() req) {
    return this.assessmentsService.assessmentAnswer(answerDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('/result/:id')
  assessmentResult(@Param('id') id: string, @Request() req) {
    return this.assessmentsService.getAssessmentResult(id, req.user.sub);
  }

  // @UseGuards(AuthGuard)

  // @UseGuards(AuthGuard)
  // @Get('/result/:id')
  // assessmentResult(@Param('id') id: string, @Request() req) {
  //   return this.assessmentsService.getAssessmentResult(
  //     id,
  //     '071120fe-0aef-4cf3-a999-6beb1312c790',
  //   )
  // }
}
