import {WordType} from './word-type';

export class Word {
    numberOrder = -1;
    ipa = '';
    word = '';
    covered = false;
    wordTypes: WordType[] = [];
    verifyRemembering? = false;

    constructor(numberOrder?: number, ipa?: string, word?: string, covered?: boolean, wordTypes?: WordType[]) {
        this.numberOrder = numberOrder ?? -1;
        this.ipa = ipa ?? '';
        this.wordTypes = wordTypes ?? [];
        this.word = word ?? '';
        this.covered = covered ?? false;
    }
}


