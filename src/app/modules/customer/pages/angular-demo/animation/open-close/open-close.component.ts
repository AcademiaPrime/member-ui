import { Component } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    // ...
} from '@angular/animations';

@Component({
  selector: 'app-open-close',
  standalone: true,
  imports: [],
  templateUrl: './open-close.component.html',
  styleUrl: './open-close.component.scss',
    animations: [
    trigger('openClose', [
        // ...
        state('open', style({
            height: '200px',
            opacity: 1,
            backgroundColor: 'yellow'
        })),
        state('closed', style({
            height: '100px',
            opacity: 0.8,
            backgroundColor: 'blue'
        })),
        transition('open => closed', [
            animate('1s')
        ]),
        transition('closed => open', [
            animate('0.2s')
        ]),
        transition('* => closed', [
            animate('1s')
        ]),
        transition('* => open', [
            animate('0.5s')
        ]),
        transition('open <=> closed', [
            animate('0.5s')
        ]),
        transition ('* => open', [
            animate ('1s',
                style ({ opacity: '*' }),
            ),
        ]),
        transition('* => *', [
            animate('1s')
        ]),
    ]),
    ],
})
export class OpenCloseComponent {
    isOpen = true;

    toggle() {
        this.isOpen = !this.isOpen;
    }
}
