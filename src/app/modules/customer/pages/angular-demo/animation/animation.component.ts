import { Component } from '@angular/core';
import {OpenCloseComponent} from "./open-close/open-close.component";
import {TodoListComponent} from "./todo-list/todo-list.component";

@Component({
  selector: 'app-animation',
  standalone: true,
  imports: [
      OpenCloseComponent,
      TodoListComponent
  ],
  templateUrl: './animation.component.html',
  styleUrl: './animation.component.scss'
})
export class AnimationComponent {

}
