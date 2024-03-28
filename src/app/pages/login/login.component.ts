import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm!: FormGroup;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: [''],
            password: ['']
        });
    }


    onSubmit() {
        console.log('login info: ', this.loginForm.value);
    }

}

interface User {
    username: string;
    password: string;
}
