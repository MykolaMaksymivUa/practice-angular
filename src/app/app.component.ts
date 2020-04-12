import { Component, OnInit } from '@angular/core';
import { SpinnerService } from './widgets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    public spinner: SpinnerService,
  ) { }

  ngOnInit(): void {
  }
}
