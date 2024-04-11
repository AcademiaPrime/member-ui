import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {User, UserLoginForm} from '@model/user.interface';

export enum LoginActionsKeys {
    LOGIN = 'Login Page | Login API'
}

export const LoginActions = createActionGroup({
    source: LoginActionsKeys.LOGIN,
    events: {
        authorize: props<{userLoginForm: UserLoginForm}>(),
        authorizeSuccess: (user: User) => ({ user }),
        authorizeFailed: emptyProps(),
        loadUser: emptyProps(),
        loadUserSuccess: (user: User) => ({ user }),
        loadUserFailed: emptyProps(),
    }
});

