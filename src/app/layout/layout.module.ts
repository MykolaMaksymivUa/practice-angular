import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PathNotFoundComponent,
  AboutComponent,
  NavigationMenuComponent,
  MessagesComponent,
  LoginComponent
} from './components';
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MainLayoutComponent } from './main-layout/main-layout.component';
@NgModule({
  declarations: [
    AboutComponent,
    PathNotFoundComponent,
    NavigationMenuComponent,
    MessagesComponent,
    MainLayoutComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavigationMenuComponent,
    MainLayoutComponent
  ]
})
export class LayoutModule { }
