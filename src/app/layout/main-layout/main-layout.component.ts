import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MessagesService } from '../../core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  constructor(
    public messagesService: MessagesService,
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() { }

  onActivate(event: any, routerOutlet: RouterOutlet): void {
    console.log(routerOutlet);
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }

  onDeactivate(event: any, routerOutlet: RouterOutlet): void {
  }

  onDisplayMessages() {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }
}