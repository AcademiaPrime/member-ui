import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-angular-demo',
  standalone: true,
  imports: [
      RouterOutlet
  ],
  templateUrl: './angular-demo.component.html',
  styleUrl: './angular-demo.component.scss'
})
export class AngularDemoComponent {

}
