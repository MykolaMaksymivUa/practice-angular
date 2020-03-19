import { Component } from '@angular/core';

import { DataService } from './data.service';

@Component({
  selector: 'app-sibling3',
  template: `
    <p>
      sibling3
      <button [disabled]="disabled" class="btn btn-primary">Some Btn</button>
      <input [attr.type]="inputType" [ngClass]="setClasses()" />
      <button class="btn btn-primary" (click)="onClick()">Pass Data</button>
    </p>
  `,
  styles: [
    `.myClass1 {
      display: block;
      height: 30px;
      width: 1000px;
      background-color: blue;
      border: unset;
    }

    .myClass2 {
      display: block;
      height: 30px;
      width: 1000px;
      background-color: yellow;
      border: unset;
    }
    .someClass1 {
      margin: 5px;
    }

    .someClass2 {
      border-top: 2px solid black;
    }
    `,
  ]
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

  setClasses(): any {
    let classes =  {
      someClass1: this.counter % 3,
      someClass2: this.counter % 2,
      myClass1: this.disabled,
      myClass2: !this.disabled,
    }

    return classes;
  }
}
