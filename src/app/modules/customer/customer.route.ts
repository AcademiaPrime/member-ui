import {Route} from '@angular/router';

export const CUSTOMER_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () => import('../customer/customer.component').then(com => com.CustomerComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then(com => com.LoginComponent),
            }
        ]
    },
];
