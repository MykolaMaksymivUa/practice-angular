import { Component } from '@angular/core';

@Component({
  selector: 'app-click-stop',
  template: `
    <div>
      <h5>output-demo works!</h5>
      <div (click)="fromParent()">
        <button class="btn btn-danger" (click)="fromChild()">Click me (Click)</button>
        <button class="btn btn-success" (click.stop)="fromChild()">Click me (Click.stop)</button>
        <button class="btn btn-primary" (click.stop)="onPewPew($event)">Pew Pew {{clickTimer}}</button>
        <br/>
        <input type="text" (input)="onInputChange($event)"/>
        <p>Your text: {{inputTextValue}}</p>
        <br/>
        <br/>
        <input type="text" #inputElem (keyup)="0" />{{inputElem.value}}
      </div>
    </div>
  `
})
export class ClickStopComponent {
  public clickTimer: number = 0;
  public inputTextValue: string = '';

  fromParent() {
    console.log('from parent');
  }

  fromChild() {
    console.log('from child');
  }

  onPewPew(e: MouseEvent) {
    this.clickTimer++;
    console.log(e);
  }

  onInputChange(e: any) {
    this.inputTextValue = e.target.value;
  }

}
