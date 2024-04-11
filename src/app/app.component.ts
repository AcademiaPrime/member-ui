import {Component, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
// Models
import {Word} from '@model/word';
// Fake Data
import {ModalService} from './components/modal/modal-service.service';
import {Store} from '@ngrx/store';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
        ModalService
    ]
})
export class AppComponent implements OnInit{
    title = 'dictionary-proj';

    words: Word[] = [];

    constructor(
        private modalService: ModalService,
        private store: Store
    ) {}

    ngOnInit() {
    }

    private remarkStrongWord(sentence: string, strongWord: string): string {
        const segments = sentence.split(strongWord);
        return segments.length === 2 ? `${segments[0]}<strong>${strongWord}</strong>${segments[1]}` : sentence;
    }

    openModal( modalTemplate: TemplateRef<any> ) {
        this.modalService.open(modalTemplate, { size: 'lg', title: 'Foo' })
            .subscribe(action => {
                console.log('modal action: ', action)
            })
    }

}
