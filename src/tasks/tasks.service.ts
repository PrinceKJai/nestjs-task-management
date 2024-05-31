import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
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

//   createTask(createTaskDto: CreateTaskDTO): Task {
//     const { title, description } = createTaskDto;

//     const task: Task = {
//       id: uuid(),
//       title,
//       description,
//       status: TaskStatus.OPEN,
//     };
//     this.tasks.push(task);
//     return task;
//   }

//   getTaskByID(id: string): Task {
//     const filteredData = this.tasks.find((item) => item.id === id);
//     if (!filteredData) {
//       throw new NotFoundException(`Task with id:${id} not found`);
//     }
//     return filteredData;
//   }

//   deleteTaskByID(id: string): string {
//     const found = this.getTaskByID(id);
//     const deletedTask = this.tasks.filter((task) => task.id !== found.id);
//     this.tasks = deletedTask;
//     return `Task with id:${id} was deleted successfully`;
//   }

//   updateTaskStatus(id: string, status: TaskStatus): Task {
//     const taskToBeUpdated = this.getTaskByID(id);
//     // const taskToBeUpdated = this.tasks.find((item) => item.id === id);
//     taskToBeUpdated.status = status;
//     return taskToBeUpdated;
//   }
}
