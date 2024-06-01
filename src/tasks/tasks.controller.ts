import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // private taskService;
  // constructor(taskService: TasksService){
  //     this.taskService = taskService;
  // }

  constructor(private taskService: TasksService) {}
  // @Get()
  // getAllTasks(@Query() filterTasksDto: GetTasksFilterDTO): Task[] {
  //   if (Object.keys(filterTasksDto).length > 0) {
  //     return this.taskService.getTasksWithFilter(filterTasksDto);
  //   }
  //   return this.taskService.getAllTasks();
  // }

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

  // @Get('/:id')
  // getTaskByID(@Param('id') id: string): Task {
  //   return this.taskService.getTaskByID(id);
  // }

  @Get('/:id')
  getTaskByID(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskByID(id);
  }

  // @Delete('/:id')
  // deleteTaskByID(@Param('id') id: string): string {
  //   return this.taskService.deleteTaskByID(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDTO,
  // ): Task {
  //   const { status } = updateTaskStatusDto;
  //   return this.taskService.updateTaskStatus(id, status);
  // }
}
