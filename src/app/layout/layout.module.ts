import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathNotFoundComponent, AboutComponent, NavigationMenuComponent } from './components';
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { MatTabsModule } from '@angular/material/tabs'
@NgModule({
  declarations: [
    AboutComponent,
    PathNotFoundComponent,
    NavigationMenuComponent,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatTabsModule,
    RouterModule
  ],
  exports: [
    NavigationMenuComponent,
  ]
})
export class LayoutModule { }
