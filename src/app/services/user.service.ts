import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserLoginRequestBody} from '@model/user.interface';
import {Observable} from 'rxjs';
import {UserControllerService} from '@server/user-controller.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly hostname = 'http://localhost:8080/mockup/';
    constructor(private httpClient: HttpClient, private userControllerService: UserControllerService) {
    }

    getUsersApi(requestBody: UserLoginRequestBody): Observable<User | null> {
        return this.userControllerService.login(requestBody);
    }

}
