import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: [''],
            password: ['']
        });
    }

    get username$(): FormControl {
        return this.loginForm.get('username') as FormControl;
    }
    get password$(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }


    onSubmit() {
        console.log('login info: ', this.loginForm.value);
    }

}
