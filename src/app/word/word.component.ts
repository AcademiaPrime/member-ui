import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
// Models
import {Word} from '../../models/word';

@Component({
    selector: 'app-word',
    standalone: true,
    imports: [ FormsModule, ReactiveFormsModule ],
    templateUrl: './word.component.html',
    styleUrl: './word.component.scss',

})
export class WordComponent implements OnInit{
    @Input({ required: true }) set word(val: Word) {
        const { numberOrder, ipa, word, wordTypes, covered } = val;
        this._word = new Word(numberOrder, ipa, word, covered, wordTypes);
    }
    _word: Word = new Word();
    makeToTesting = false;
    wordForm!: any;

    constructor(private formBuilder: FormBuilder) {
        this.wordForm = this.formBuilder.group({
            word: ['']
        });
    }

    ngOnInit() {
        this.wordInput.valueChanges.subscribe(res => {
            console.log('res');
            this._word.verifyRemembering = res.toLowerCase() === this._word.word.toLowerCase();
        });
    }

    get wordInput(): FormControl {
        return this.wordForm.get('word');
    }

    onMakeToTesting() {
        this.makeToTesting = !this.makeToTesting;
    }

    onSave() {
        console.log('save: ', this.wordInput.value);
    }
}
