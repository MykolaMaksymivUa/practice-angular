import { Component, OnInit } from '@angular/core';

import { TaskModel } from './../../models/task.model';
import { TaskPromiseService } from './../../';
import { Router } from '@angular/router';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Promise<Array<TaskModel>>;

  constructor(
    private taskPromiseService: TaskPromiseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.tasks = this.taskPromiseService.getTasks();
  }

  onCompleteTask(task: TaskModel): void {
    this.updateTask(task);
  }

  onEditTask(task: TaskModel): void {
    console.log(task);
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  private async updateTask(task: TaskModel) {
    const updatedTask = await this.taskPromiseService.updateTask({
      ...task,
      done: true
    });

    const tasks: TaskModel[] = await this.tasks;
    const index = tasks.findIndex(t => t.id === updatedTask.id);
    tasks[index] = { ...updatedTask };
  }

  onCreateTask() {
    this.router.navigate(['/add']);
  }

  onDeleteTask(id: number) {
    this.taskPromiseService.deleteTask(id)
      .then(() => (this.getTasks()))
      .catch(err => console.log(err));
  }

}
