import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from './widgets';
import { CustomPreloadingStrategy } from './core';
import { Title } from '@angular/platform-browser';

import { Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(
    public spinner: SpinnerService,
    private preloadStrategy: CustomPreloadingStrategy,
    private titleService: Title,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log('MODULES:');
    console.log(this.preloadStrategy.preloadedModules);

    // this.setPageTitle();
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  private setPageTitle() {
    this.sub = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data)
      )
      .subscribe(data => this.titleService.setTitle(data.title));
  }
}
