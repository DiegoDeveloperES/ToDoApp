import { Task } from './../shared/task';
import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task-list-item',
  templateUrl: './task-list-item.component.html',
  styleUrls: ['./task-list-item.component.css'],
})
export class TaskListItemComponent implements OnInit {
  @Input()
  task: Task;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private tasklistform: TaskListComponent
  ) {}

  ngOnInit() {}

  async remove(task: Task) {
    await this.taskService.deleteTask(task.id);
    this.tasklistform.ngOnInit();
    //this.router.navigate(['']);
  }

  async onCompletedCheckChange(task: Task) {
    await this.taskService.updateTask(task);
    this.router.navigate(['']);
  }
}
