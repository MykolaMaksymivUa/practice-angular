import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PathNotFoundComponent, HomeComponent, AboutComponent } from './components';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    PathNotFoundComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
