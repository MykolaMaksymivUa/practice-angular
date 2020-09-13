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
//@TODO create material module
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

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
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    NavigationMenuComponent,
    MainLayoutComponent,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatButtonModule,
  ]
})
export class LayoutModule { }
