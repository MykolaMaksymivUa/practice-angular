import { Component, OnInit } from '@angular/core';

import { TaskModel } from './../../models/task.model';
import { TaskArrayService } from './../../services/task-array.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators'
@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: TaskModel;

  constructor(
    private taskArrayService: TaskArrayService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.task = new TaskModel();
    const obs = {
      next: (task: TaskModel): TaskModel => {
        return this.task = { ...task }
      },
      error: (error: Error): void => {
        return console.error(error);
      }
    }

    this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => this.taskArrayService.getTask(+params.get('taskID')))
    ).subscribe(obs);
  }

  onSaveTask() {
    const task = { ...this.task } as TaskModel;

    if (task.id) {
      this.taskArrayService.updateTask(task);
    } else {
      this.taskArrayService.createTask(task);
    }

    this.onGoBack();
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
