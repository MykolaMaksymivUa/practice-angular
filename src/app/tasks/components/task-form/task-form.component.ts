import { Component, OnInit, OnDestroy } from '@angular/core';

import { Task, TaskModel } from './../../models/task.model';
import { Router } from '@angular/router';

// @NgRx
import { Store, select } from '@ngrx/store';
import { AppState } from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';
import { selectSelectedTaskByUrl } from './../../../core/@ngrx/tasks/tasks.selectors';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task: TaskModel;
  private componentDestroyed$: Subject<void> = new Subject<void>();

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    const observer: any = {
      next: (task: TaskModel) => {
        this.task = { ...task };
      },
      error(err) {
        console.log(err);
      },
      complete() {
        console.log('Stream is completed');
      }
    };

    this.store
      .pipe(
        select(selectSelectedTaskByUrl),
        takeUntil(this.componentDestroyed$)
      )
      .subscribe(observer);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  onSaveTask() {
    const task = { ...this.task } as Task;

    if (task.id) {
      this.store.dispatch(TasksActions.updateTask({ task }));
    } else {
      this.store.dispatch(TasksActions.createTask({ task }));
    }
  }

  onGoBack(): void {
    this.store.dispatch(RouterActions.go({
      path: ['/home']
    }));
  }
}
