import {Injectable} from '@angular/core';
import users from '@mock/users.json';
import {Response} from '@model/response.interface';
import {Observable, of} from "rxjs";
import {User, UserLoginRequestBody} from "@model/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserControllerService {

    private readonly _users: User[];

    constructor() {
        this._users = users as User[];
        console.log('users: ', users);
    }

    login(userInfo: UserLoginRequestBody): Observable<User | null> {
        const response: Response = {
            code: 200,
            data: null,
            errorCode: '',
            message: '',
            success: true,
        };

        for(const user of this._users) {
            if ( user.username === userInfo.username && user.password === userInfo.password ) {
                return of(user);
            }
        }

        return of(null);
    }
}
