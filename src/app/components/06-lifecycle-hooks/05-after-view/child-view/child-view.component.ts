import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-view',
  templateUrl: './child-view.component.html',
  styleUrls: ['./child-view.component.css']
})
export class ChildViewComponent {
  firstName = 'Vitaliy';
  @Output() childClickName = new EventEmitter();
  constructor(){}

  childClick(event: Event): void {
    this.childClickName.emit(this.firstName);
  }

}
