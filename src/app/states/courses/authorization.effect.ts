import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType, OnInitEffects} from '@ngrx/effects';
import {UserService} from '../../services/user.service';
import {exhaustMap, map, catchError} from 'rxjs';
import { LoginActions } from './courses.action';
import {LocalStorageService} from '../../services/local-storage.service';
import {User} from '@model/user.interface';
import {Action} from '@ngrx/store';

@Injectable()
export class AuthorizationEffect implements OnInitEffects{

    authorizedUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.authorize),
            exhaustMap(({userLoginForm}) => {
                return this.userService.getUsersApi(userLoginForm).pipe(
                    map(user => {
                        if ( user ) {
                            if (userLoginForm.rememberMe) {
                                this.localStorageService.storeData(this.localStorageService.USER, user);
                            }
                            return LoginActions.authorizeSuccess(user);
                        }
                        return LoginActions.authorizeFailed();
                    }),
                    catchError(() => [])
                );
            })
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService,
        private localStorageService: LocalStorageService
    ) {}

    ngrxOnInitEffects(): Action {
        const existUser = this.localStorageService.getData<User>(this.localStorageService.USER);
        return existUser ? LoginActions.authorizeSuccess(existUser) : LoginActions.loadUserFailed();
    }
}
