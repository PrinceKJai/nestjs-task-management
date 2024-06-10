import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
  //   constructor(
  //     @InjectRepository(TaskRepository)
  //     private taskRepository: TaskRepository,
  //   ) {}
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository,
  ) {}
  //   private tasks: Task[] = [];

  //   getAllTasks(): Task[] {
  //     return this.tasks;
  //   }

  //   getTasksWithFilter(filterTasksDto: GetTasksFilterDTO): Task[] {
  //     const { status, search } = filterTasksDto;
  //     let tasks = this.tasks;

  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       tasks = tasks.filter((task) => {
  //         if (task.title.includes(search) || task.description.includes(search)) {
  //           console.log('tasks title', task.title);
  //           console.log('tasks description', task.description);
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       });
  //     }
  //     return tasks;
  //   }

  async getTasks(filterTasksDto: GetTasksFilterDTO): Promise<Task[]> {
    const { status, search } = filterTasksDto;
    const query = this.taskRepository.createQueryBuilder('task');
    if (status) {
      //:status is a variable and can be anything
      //  query.andWhere('task.status = :hello', { hello: status});
      query.andWhere('task.status = :status', { status: status });
    }
    if (search) {
      //:search is a variable and can be anything
      //  LOWER is for converting the passed in serach query to lower case
      //the LIKE is for retruning values like: fo, foo, food even if the user seraches for food
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  //   createTask(createTaskDto: CreateTaskDTO): Task {
  //     const { title, description } = createTaskDto;

  //     const task: Task = {
  //       id: uuid(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //     };
  //     this.tasks.push(task);
  //     return task;b
  //   }

  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.taskRepository.save(task);
    return task;
  }

  //   getTaskByID(id: string): Task {
  //     const filteredData = this.tasks.find((item) => item.id === id);
  //     if (!filteredData) {
  //       throw new NotFoundException(`Task with id:${id} not found`);
  //     }
  //     return filteredData;
  //   }

  async getTaskByID(id: string): Promise<Task> {
    const filteredData = await this.taskRepository.findOne(id);
    if (!filteredData) {
      throw new NotFoundException(`Task with id:${id} not found`);
    }
    return filteredData;
  }

  //   deleteTaskByID(id: string): string {
  //     const found = this.getTaskByID(id);
  //     const deletedTask = this.tasks.filter((task) => task.id !== found.id);
  //     this.tasks = deletedTask;
  //     return `Task with id:${id} was deleted successfully`;
  //   }

  async deleteTaskByID(id: string): Promise<string> {
    // const found = await this.getTaskByID(id);
    // await this.taskRepository.delete(found);
    // return `Task with id:${id} was deleted successfully`;

    const result = await this.taskRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with Id: ${id} was not found!`);
    }
    return `Task with id:${id} was deleted successfully`;
  }

  //   updateTaskStatus(id: string, status: TaskStatus): Task {
  //     const taskToBeUpdated = this.getTaskByID(id);
  //     // const taskToBeUpdated = this.tasks.find((item) => item.id === id);
  //     taskToBeUpdated.status = status;
  //     return taskToBeUpdated;
  //   }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const taskToBeUpdated = await this.getTaskByID(id);
    taskToBeUpdated.status = status;
    await this.taskRepository.save(taskToBeUpdated);
    return taskToBeUpdated;
  }
}
