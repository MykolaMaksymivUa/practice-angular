import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksServicesModule } from './tasks-services.module';
import { TaskListComponent, TaskComponent, TaskFormComponent } from '.';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [TaskListComponent, TaskComponent, TaskFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    TasksServicesModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    TasksRoutingModule,
  ]
})
export class TasksModule { }
