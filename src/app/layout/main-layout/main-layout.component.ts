import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MessagesService } from '../../core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  constructor(
    public messagesService: MessagesService,
    private router: Router
  ) { }

  ngOnInit() { }

  onActivate(event: any, routerOutlet: RouterOutlet): void {
    console.log(event);
    console.log(routerOutlet);
  }

  onDeactivate(event: any, routerOutlet: RouterOutlet): void {
    console.log(event);
    console.log(routerOutlet);
  }

  onDisplayMessages() {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }
}