import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  // async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
  //   const { title, description } = createTaskDto;

  //   const task = this.create({
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   });

  //   await this.save(task);
  //   return task;
  // }

  // async getTasks(createTaskDto: CreateTaskDTO): Promise<Task[]> {
  //   const query = this.createQueryBuilder('task');

  // }

}
