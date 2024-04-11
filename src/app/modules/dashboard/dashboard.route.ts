import {Route} from '@angular/router';

export const DASHBOARD_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () => import('../dashboard/dashboard.component').then(com => com.DashboardComponent),
        children: [
            {
                path: 'message',
                loadComponent: () => import('./pages/messages/messages.component').then(com => com.MessagesComponent)
            },
            {
                path: 'my-profile',
                loadComponent: () => import('./pages/my-profile/my-profile.component').then(com => com.MyProfileComponent)
            }
        ]
    },
];
