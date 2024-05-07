import {ChangeDetectionStrategy, Component, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
// Models
import {Word} from '../models/word';
// Fake Data
import {ModalService} from './components/modal/modal-service.service';
import {Store} from '@ngrx/store';
import {
    NgMultiselectDropdownComponent
} from './components/library/ng-multiselect-dropdown/ng-multiselect-dropdown.component';
import {IDropdownSettings, ListItem} from './components/library/ng-multiselect-dropdown/multiselect.model';
import {FormsModule} from '@angular/forms';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        // Components
        NgMultiselectDropdownComponent

    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
        ModalService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
    title = 'member-ui';

    words: Word[] = [];

    constructor(
        private modalService: ModalService,
        private store: Store
    ) {}

    cities = [
        {
            item_id: 1,
            item_text: 'India',
            image: 'http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg',
        },
        {
            item_id: 2,
            item_text: 'Spain',
            image: 'http://www.sciencekids.co.nz/images/pictures/flags96/Spain.jpg',
        },
        {
            item_id: 3,
            item_text: 'United Kingdom',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/United_Kingdom.jpg',
        },
        {
            item_id: 4,
            item_text: 'Canada',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Canada.jpg',
        },
        {
            item_id: 5,
            item_text: 'Israel',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Israel.jpg',
        },
        {
            item_id: 6,
            item_text: 'Brazil',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Brazil.jpg',
        },
        {
            item_id: 7,
            item_text: 'Barbados',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Barbados.jpg',
        },
        {
            item_id: 8,
            item_text: 'Mexico',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Mexico.jpg',
        },
    ];
    selectedItems = [
        {
            item_id: 1,
            item_text: 'India',
            image: 'http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg',
        },
        {
            item_id: 5,
            item_text: 'Israel',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Israel.jpg',
        },
    ];
    singleSelectedItems = {
        item_id: 1,
        item_text: 'India',
        image: 'http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg',
    };

    ngOnInit() {}

    onItemSelect(item: ListItem) {
        console.log('select one: ', item);
    }
    onItemDeselect(item: any) {
        console.log('deselect one: ', item);
    }
    onSelectAll(items: any) {

        console.log('select all:', items);
    }
}
