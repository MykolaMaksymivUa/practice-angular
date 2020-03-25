import { Component, OnInit, Inject, InjectionToken } from '@angular/core';

import { ArrayDataService, adsInstance } from '../../services';
import { TITLE, titleVal } from './injection-value.service';

@Component({
  selector: 'app-value-demo',
  templateUrl: './value-demo.component.html',
  styleUrls: ['./value-demo.component.css'],
  providers: [
    { provide: TITLE, useValue: titleVal },
    { provide: ArrayDataService, useValue: adsInstance }
  ]
})
export class ValueDemoComponent implements OnInit {
  content: string;

  constructor(
    @Inject(TITLE) public ttl: string,
    private adsIn: ArrayDataService
  ) {}

  ngOnInit() {
    this.content = this.adsIn.getAllData().toString();
  }
}
