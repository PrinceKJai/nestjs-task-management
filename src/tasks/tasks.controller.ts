import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
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

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDTO): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskByID(@Param('id') id: string): Task {
    return this.taskService.getTaskByID(id);
  }

  @Delete('/:id')
  deleteTaskByID(@Param('id') id: string): void {
    return this.taskService.deleteTaskByID(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
    return this.taskService.updateTaskStatus(id, status);
  }
}
