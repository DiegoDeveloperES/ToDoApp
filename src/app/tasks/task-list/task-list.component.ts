import { Task } from '../shared/task';
import { TaskService } from './../shared/task.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})

export class TaskListComponent {
  tasks: Task[] = [];
  constructor(private TaskService: TaskService) {}
  async ngOnInit() {
    this.tasks = await this.TaskService.listTask();
  }
}
