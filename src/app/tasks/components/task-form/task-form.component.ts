import { Component, OnInit } from '@angular/core';

import { TaskModel } from './../../models/task.model';
import { TaskPromiseService } from './../../';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { switchMap } from 'rxjs/operators'
@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: TaskModel;

  constructor(
    private taskPromiseService: TaskPromiseService,
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

    this.activatedRoute.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const existingTask = params.get('taskID');

          return existingTask
            ? this.taskPromiseService.getTask(+existingTask)
            : Promise.resolve(null)
        })
      )
      .subscribe(obs);
  }

  onSaveTask() {
    const task = { ...this.task } as TaskModel;

    const method = task.id ? 'updateTask' : 'createTask';
    this.taskPromiseService[method](task)
      .then(() => this.onGoBack())
      .catch(err => console.error(err));
  }

  onGoBack(): void {
    this.router.navigate(['/home']);
  }
}
