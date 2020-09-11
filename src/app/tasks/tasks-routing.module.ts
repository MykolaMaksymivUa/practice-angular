import { TaskListComponent, TaskFormComponent } from './components';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MetaDefinition } from '@angular/platform-browser';

const metaTags: Array<MetaDefinition> = [
  {
    name: 'description',
    content: 'Task Manager Application. This is an ASP application'
  },
  {
    name: 'keywords',
    content: 'Angular tutorial, SPA Application, Routing'
  }
];


const routes: Routes = [
  {
    path: 'home',
    component: TaskListComponent,
    data: {
      title: 'Task manager',
      meta: metaTags
    },
  },
  {
    path: 'edit/:taskID',
    component: TaskFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }