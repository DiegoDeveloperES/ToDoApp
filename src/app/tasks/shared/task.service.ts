import { Injectable } from '@angular/core';
import { Task } from './task';

import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];

  delete(id: number) {
    const taskIndex = this.tasks.findIndex((value) => value.id == id);
    this.tasks.splice(taskIndex, 1);
  }

  constructor(private http: HttpClient) {}

  async listTask() {
    console.log("entrou");

    var result = await this.http
      .get<any>(`${environment.api}/list-tasks`)
      .toPromise();
      if (result == null) {
        result = this.tasks.length = 0;
      }

    return result;
  }

  async createTask(task: Task) {
    const result = await this.http
      .post<any>(`${environment.api}/create-task`, task)
      .toPromise();
    return result;
  }

  async deleteTask(id: number) {
    await this.http
      .delete<Task>(`${environment.api}/delete-task/${id}`)
      .toPromise();
  }

  async getTaskById(id: number) {
    //const task = this.tasks.find((value) => value.id == id);
    const task = await this.http
      .get<Task>(`${environment.api}/list-task/${id}`)
      .toPromise();
    return task;
  }

  async updateTask(task: Task) {
    if (task.id) {
      console.log(task);
      await this.http
        .put(`${environment.api}/update-task/${task.id}`, task)
        .toPromise();
    }
    // else {
    //   const lastId = this.tasks[this.tasks.length - 1].id;
    //   task.id = lastId + 1;
    //   this.tasks.push(task);
    // }
  }
}
