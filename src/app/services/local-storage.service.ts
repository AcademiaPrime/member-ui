import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User, UserLoginRequestBody} from "@model/user.interface";
import {Observable, of} from "rxjs";
import {UserControllerService} from "@server/user-controller.service";

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
