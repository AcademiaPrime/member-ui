import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {LoginActions} from '@states/authorization/authorization.action';
// Models
import {UserLoginForm} from '@model/user.interface';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder, private store: Store) {
        this.loginForm = this.fb.group({
            username: [''],
            password: [''],
            rememberMe: [false]
        });
    }

    get username$(): FormControl {
        return this.loginForm.get('username') as FormControl;
    }

    get password$(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }


    onSubmit() {
        const { username, password, rememberMe } = this.loginForm.value;
        const userRequest: UserLoginForm = { username, password, rememberMe };
        this.store.dispatch(LoginActions.authorize({userLoginForm: userRequest}));
    }

}
