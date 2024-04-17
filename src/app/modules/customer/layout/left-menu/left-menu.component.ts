import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {LayoutActions} from '@states/layout/layout.action';

@Component({
    selector: 'app-left-menu',
    standalone: true,
    imports: [],
    templateUrl: './left-menu.component.html',
    styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {

    constructor(private store: Store) {
    }

    onCloseLeftMenu() {
        this.store.dispatch(LayoutActions.hideExtendMenu());
    }
}
