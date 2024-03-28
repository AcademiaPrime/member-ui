import {Component, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
// Components
import {WordComponent} from './word/word.component';
// Models
import {Word} from '../models/word';
// Fake Data
import FakeData from './../mockup/words.json';
import {ModalComponent} from "./components/modal/modal.component";
import {ModalService} from "./components/modal/modal-service.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OpenCloseComponent} from "./pages/angular-demo/animation/open-close/open-close.component";


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

    constructor(private modalService: ModalService) {}
    ngOnInit() {
        const sortedWords = FakeData.sort((a: Word, b: Word) => a.numberOrder - b.numberOrder);
        for ( let word of sortedWords ) {
            for (let wordType of word.wordTypes) {
                for (let meaning of wordType.meanings) {
                    meaning.sentences = meaning.sentences.map(item => {
                        return {
                            ...item,
                            example: this.remarkStrongWord(item.example, item.enRemarkableWord),
                            vnExplanation: this.remarkStrongWord(item.vnExplanation, item.vnRemarkableWord),
                        };
                    })
                }
            }
        }

        this.words = sortedWords;
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
