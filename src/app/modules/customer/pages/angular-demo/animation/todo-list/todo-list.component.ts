import {Component, HostBinding} from '@angular/core';
import {TodoItemComponent} from "../todo-item/todo-item.component";
import {animate, keyframes, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-todo-list',
    standalone: true,
    imports: [
        CommonModule,
        TodoItemComponent
    ],
    templateUrl: './todo-list.component.html',
    styleUrl: './todo-list.component.scss',
    animations: [
        trigger('myInsertRemoveTrigger', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
            ]),
            transition(':leave', [
                animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
            ]),
        ]),

        trigger('openClose', [
            state('open', style({
                height: '200px',
                opacity: 1,
                backgroundColor: 'yellow'
            })),
            state('closed', style({
                height: '100px',
                opacity: 0.5,
                backgroundColor: 'green'
            })),
            transition('* => *', [
                animate('1s', keyframes ( [
                    style({ opacity: 0.1, offset: 0.1 }),
                    style({ opacity: 0.6, offset: 0.2 }),
                    style({ opacity: 1,   offset: 0.5 }),
                    style({ opacity: 0.2, offset: 0.7 })
                ]))
            ])
        ]),

        trigger('filterAnimation', [
            transition(':enter, * => 0, * => -1', []),
            transition(':increment', [
                query(':enter', [
                    style({ opacity: 0, width: 0 }),
                    stagger(50, [
                        animate('300ms ease-out', style({ opacity: 1, width: '*' })),
                    ]),
                ], { optional: true })
            ]),
            transition(':decrement', [
                query(':leave', [
                    stagger(50, [
                        animate('300ms ease-out', style({ opacity: 0, width: 0 })),
                    ]),
                ])
            ]),
        ]),
    ]
})
export class TodoListComponent {

    isShown = false;
    todos: string[] = [
    ];
    isDisabled = false;
    isOpen = false;


    onAddTodoItem(val: string) {
        this.todos.push(val);
    }

    onRemoveTodo(index: number) {
        this.todos.splice(index, 1);
    }
}
