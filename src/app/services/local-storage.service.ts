import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    readonly USER = 'USER';

    storeData(key: string, value: unknown) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getData<T>(key: string): T | null {
        const data = localStorage.getItem(key);
        if (data) {
            return JSON.parse(data);
        }

        return null;
    }

}
