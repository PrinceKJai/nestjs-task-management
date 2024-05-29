import { Body, Controller, Get, Post } from '@nestjs/common';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  // private taskService;
  // constructor(taskService: TasksService){
  //     this.taskService = taskService;
  // }

  constructor(private taskService: TasksService) {}
  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Task {
    return this.taskService.createTask(title, description);
  }
  //   @Post()
  //   createTask(@Body() body): Task {
  //       return this.taskService.createTask(body.title, body.description)
  //   }
}
