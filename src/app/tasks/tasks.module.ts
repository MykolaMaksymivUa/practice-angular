import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksServicesModule } from './tasks-services.module';
import { TaskListComponent, TaskComponent } from '.';


@NgModule({
  declarations: [TaskListComponent, TaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    TasksServicesModule,
    TasksRoutingModule,
  ]
})
export class TasksModule { }
