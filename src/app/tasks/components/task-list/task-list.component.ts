import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Task, TaskModel } from './../../models/task.model';
// import { TaskPromiseService } from './../../';

//ngrx
import { AppState, selectTasksData, selectTasksError, selectTasksState, TasksState } from './../../../core/@ngrx';
import { select, Store } from '@ngrx/store';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

//rxjs
import { Observable } from 'rxjs';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<ReadonlyArray<Task>>;
  tasksError$: Observable<Error | string>;


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.tasks$ = this.store.pipe(select(selectTasksData));
    this.tasksError$ = this.store.pipe(select(selectTasksError));
  }

  onCompleteTask(task: TaskModel): void {
    const taskToComplete: Task = { ...task, done: true };
    this.store.dispatch(TasksActions.completeTask({ task: taskToComplete }));

  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.store.dispatch(RouterActions.go({ path: link }));
  }

  onCreateTask() {
    this.store.dispatch(RouterActions.go({ path: ['/add'] }));
  }

  onDeleteTask(task: TaskModel) {
    const taskToDelete: Task = { ...task };
    this.store.dispatch(TasksActions.deleteTask({ task: taskToDelete }));
  }
}
