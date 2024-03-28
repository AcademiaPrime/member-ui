import { Routes } from '@angular/router';
import {WordComponent} from './word/word.component';

export const routes: Routes = [
    {
        path: 'dictionary',
        component: WordComponent
    },
    {
        path: 'login',
        loadComponent: () => import ('./pages/login/login.component').then(com => com.LoginComponent)
    },
    {
        path: 'angular-demo',
        loadComponent: () => import('./pages/angular-demo/angular-demo.component').then(mod => mod.AngularDemoComponent),
        loadChildren: () => import('./pages/angular-demo/angular-demo.route').then(mod => mod.ANGULAR_DEMO_ROUTES)
    },
];
