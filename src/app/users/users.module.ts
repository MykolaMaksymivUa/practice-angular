import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersServicesModule } from './users-services.module';
import { UserComponent } from './components';
import { LayoutModule } from './../layout/layout.module';


@NgModule({
  declarations: [
    UserComponent,
    ...UsersRoutingModule.components
  ],
  imports: [
    CommonModule,
    UsersServicesModule,
    FormsModule,
    LayoutModule,
    UsersRoutingModule,
  ]
})
export class UsersModule { }
