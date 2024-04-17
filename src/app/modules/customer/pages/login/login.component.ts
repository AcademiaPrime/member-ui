import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {Store} from '@ngrx/store';
import {LoginActions} from '@states/authorization/authorization.action';
// Models
import {UserLoginForm} from '@model/user.interface';
import {NavigationService} from '../../services/navigation.service';

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

    constructor(
        private fb: FormBuilder,
        private store: Store,
        private navigationService: NavigationService
    ) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['',[Validators.required]],
            rememberMe: [false]
        });
    }

    onSubmit() {
        const { username, password, rememberMe } = this.loginForm.value;
        const userRequest: UserLoginForm = { username, password, rememberMe };
        this.store.dispatch(LoginActions.authorize({userLoginForm: userRequest}));
    }

}
