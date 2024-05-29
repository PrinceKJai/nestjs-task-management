import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    private tasks = [{ id: '12', description: "Lrem pisnj"}];

     getAllTasks() {
        return this.tasks;
    }
}
