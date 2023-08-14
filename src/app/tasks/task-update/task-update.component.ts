import { Component } from '@angular/core';
import { Task } from '../shared/task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent {
  task: Task = new Task();
  title: string = "Nova Tarefa";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
  ){}

async ngOnInit(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.task = await this.taskService.getTaskById(parseInt(id));
      this.title = 'Alterando tarefa.';
    }
  }

  async change(task: Task){
    await this.taskService.updateTask(task);
    this.router.navigate(['']);
  }
}
