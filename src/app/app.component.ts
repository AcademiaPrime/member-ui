import {ChangeDetectionStrategy, Component, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
// Models
import {Word} from '@model/word';
// Fake Data
import {ModalService} from './components/modal/modal-service.service';
import {Store} from '@ngrx/store';
import {PresentationComponent} from './components/presentation/presentation.component';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        PresentationComponent
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

    ngOnInit() {
    }

    private remarkStrongWord(sentence: string, strongWord: string): string {
        const segments = sentence.split(strongWord);
        return segments.length === 2 ? `${segments[0]}<strong>${strongWord}</strong>${segments[1]}` : sentence;
    }

    openModal( modalTemplate: TemplateRef<unknown> ) {
        this.modalService.open(modalTemplate, { size: 'lg', title: 'Foo' })
            .subscribe(action => {
                console.log('modal action: ', action);
            });
    }


    doSomething(): string {
        console.log('do something');
        return 'asdsad';
    }

}
