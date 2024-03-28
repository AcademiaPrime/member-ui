import {Sentence} from "./sentence";

export interface Meaning {
    code: string,
    synonyms: string[],
    details: string,
    sentences: Sentence[]
}
