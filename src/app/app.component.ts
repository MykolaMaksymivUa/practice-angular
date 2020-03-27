import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  onActivate(event: any, routerOutlet: RouterOutlet): void {
    console.log(event);
    console.log(routerOutlet);
  }

  onDeactivate(event: any, routerOutlet: RouterOutlet): void {
    console.log(event);
    console.log(routerOutlet);
  }
}
