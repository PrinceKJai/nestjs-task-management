import { Injectable } from '@nestjs/common';
import { TaskStatus, Task } from './task.model';
import { v4 as uuid } from 'uuid';
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

  createTask(title: string, description: string): Task {
    const task: Task = {
        id: uuid(),
        title,
        description,
        status: TaskStatus.OPEN
    }
    this.tasks.push(task)
    return task;
  }
}
