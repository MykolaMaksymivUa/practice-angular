import { Component } from '@angular/core';

import { DataService } from './data.service';

@Component({
  selector: 'app-sibling3',
  template: `
    <p>
      sibling3
      <button [disabled]="disabled" class="btn btn-primary">Some Btn</button>
      <input [attr.type]="inputType" [class]="'myClass'" />
      <button class="btn btn-primary" (click)="onClick()">Pass Data</button>
    </p>
  `
})
export class Sibling3Component {
  counter = 0;
  disabled: boolean = true;
  constructor(private dataService: DataService<string>) {}

  onClick() {
    this.counter++;
    this.disabled = !this.disabled;
    this.dataService.setData(`Data from sibling 1(${this.counter})`);
  }

  //change detection.
  get inputType(): string {
    return this.disabled ? 'text': 'password';
  }
}
