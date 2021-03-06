import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { TaskModel } from './../models/task.model';

@Injectable({
  providedIn: 'any'
})
export class TaskPromiseService {
  private tasksUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  getTasks(): Promise<TaskModel[]> {
    return this.http
      .get(this.tasksUrl)
      .toPromise()
      .then(response => response as TaskModel[])
      .catch(this.handleError);
  }

  getTask(id: string | number): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then((result) => result as TaskModel)
      .catch(this.handleError);
  }

  updateTask(task: TaskModel): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${task.id}`;
    const body = JSON.stringify(task);
    const ops = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    return this.http
      .put(url, body, ops)
      .toPromise()
      .then((result) => result as TaskModel)
      .catch(this.handleError);
  }

  createTask(task: TaskModel): Promise<TaskModel> {
    const body = JSON.stringify(task);
    const ops = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    return this.http
      .post(this.tasksUrl, body, ops)
      .toPromise()
      .then((result) => result as TaskModel)
      .catch(this.handleError);
  }

  deleteTask(id: number): Promise<TaskModel> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http
      .delete(url)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
