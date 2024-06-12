import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Logger
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  // private taskService;
  // constructor(taskService: TasksService){
  //     this.taskService = taskService;
  // }
private logger = new Logger('TasksController');
  constructor(private taskService: TasksService) {}
  // @Get()
  // getAllTasks(@Query() filterTasksDto: GetTasksFilterDTO): Task[] {
  //   if (Object.keys(filterTasksDto).length > 0) {
  //     return this.taskService.getTasksWithFilter(filterTasksDto);
  //   }
  //   return this.taskService.getAllTasks();
  // }

  @Get()
  getTasks(@Query() filterTasksDto: GetTasksFilterDTO, @GetUser() user: User): Promise<Task[]> {
    this.logger.verbose( `User: ${user.username} retrieving tasks with filters ${JSON.stringify(filterTasksDto)}`)
    return this.taskService.getTasks(filterTasksDto, user);
  }

  //   @Post()
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): Task {
  //     return this.taskService.createTask(title, description);
  //   }
  //   @Post()
  //   createTask(@Body() body): Task {
  //       return this.taskService.createTask(body.title, body.description)
  //   }

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDTO): Task {
  //   return this.taskService.createTask(createTaskDto);
  // }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDTO,
    @GetUser() user: User
    ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  // @Get('/:id')
  // getTaskByID(@Param('id') id: string): Task {
  //   return this.taskService.getTaskByID(id);
  // }

  @Get('/:id')
  getTaskByID(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.taskService.getTaskByID(id, user);
  }

  // @Delete('/:id')
  // deleteTaskByID(@Param('id') id: string): string {
  //   return this.taskService.deleteTaskByID(id);
  // }

  @Delete('/:id')
  async deleteTaskByID(@Param('id') id: string, @GetUser() user: User): Promise<string> {
    return this.taskService.deleteTaskByID(id, user);
  }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDTO,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.taskService.updateTaskStatus(id, status);
  // }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @GetUser() user: User,
    @Body() updateTaskStatusDto: UpdateTaskStatusDTO,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
