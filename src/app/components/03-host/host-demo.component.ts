import { Component } from '@angular/core';
import { DataService } from '../../services';

@Component({
  selector: 'app-host-demo',
  templateUrl: './host-demo.component.html',
  providers: [DataService]
})
export class HostDemoComponent {}
