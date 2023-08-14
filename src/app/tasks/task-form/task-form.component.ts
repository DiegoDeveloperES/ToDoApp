import { Task } from './../shared/task'
import { Component,OnInit } from '@angular/core';
import { TaskService } from './../shared/task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent implements OnInit{
  task: Task = new Task();
  title: string = "Nova Tarefa";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ){}

async ngOnInit(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.task = await this.taskService.getTaskById(parseInt(id));
      this.title = 'Alterando tarefa.';
    }
  }

  async onSubmit(){
    await this.taskService.createTask(this.task);
    this.router.navigate(['']);
  }
}
