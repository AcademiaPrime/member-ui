import {Component, signal, input} from '@angular/core';
// Models
import {MenuState, Menu} from '@model/menu.interface';
// Animations
import {openClosedAnimations} from './animation';

@Component({
    selector: 'app-sub-menu',
    standalone: true,
    imports: [],
    templateUrl: './sub-menu.component.html',
    styleUrl: './sub-menu.component.scss',
    animations: openClosedAnimations
})
export class SubMenuComponent {


    readonly menuState = MenuState;

    subMenu = input.required<Menu[]>();
    openingSubMenu = signal<Menu | null>(null);
    onOpenSubSubMenu(subSubMenu: Menu | null) {
        this.openingSubMenu.set(subSubMenu);
    }


}
