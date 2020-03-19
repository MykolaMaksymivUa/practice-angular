import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';

import { ChildComponent } from './../child/child.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('input', {static: false})
  inputField: ElementRef<HTMLInputElement>;

  @ViewChild(ChildComponent, {static: false})
  child: ChildComponent;

  @ViewChildren(ChildComponent)
  children: QueryList<ChildComponent>;

  @ViewChild('child', {static: false})
  childComp: ElementRef<ChildComponent>;

  constructor() {}

  ngAfterViewInit() {
    this.inputField.nativeElement.value = 'Value From Parent';
    this.child.onClick();

    console.log(this.childComp);
    console.log(this.children);
    console.log(this.inputField);
  }

  myCustomeMethod(list: QueryList<ChildComponent>): void {
    list.forEach(el => {
      el.onClick('Meow');
    })
  }
}
