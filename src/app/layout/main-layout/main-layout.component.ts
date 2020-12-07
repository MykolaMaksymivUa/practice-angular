import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MessagesService } from '../../core';
import { Title, Meta } from '@angular/platform-browser';

import * as RouterActions from '../../core/@ngrx/router/router.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  constructor(
    public messagesService: MessagesService,
    private titleService: Title,
    private metaService: Meta,
    private store: Store,
  ) { }

  ngOnInit() { }

  onActivate(event: any, routerOutlet: RouterOutlet): void {
    this.titleService.setTitle(routerOutlet.activatedRouteData.title);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }

  onDeactivate(event: any, routerOutlet: RouterOutlet): void {
  }

  onDisplayMessages() {
    this.store.dispatch(RouterActions.go({
      path: [{ outlets: { messages: ['messages'] } }]
    }));

    this.messagesService.isDisplayed = true;
  }
}