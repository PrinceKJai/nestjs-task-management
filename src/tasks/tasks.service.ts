import { Injectable } from '@nestjs/common';
import { TaskStatus, Task } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [
    // {
    //   id: '123',
    //   title: 'My Task',
    //   description: 'jdsbkdhf',
    //   status: TaskStatus.DONE,
    // },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDTO): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskByID(id: string): Task {
    const filteredData = this.tasks.find((item) => item.id === id);
    return filteredData;
  }
}
