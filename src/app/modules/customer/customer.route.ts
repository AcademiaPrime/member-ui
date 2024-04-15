import {Route} from '@angular/router';

export const CUSTOMER_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () => import('../customer/customer.component').then(com => com.CustomerComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/login/login.component').then(com => com.LoginComponent),
            },
            {
                path: 'teachers',
                loadComponent: () => import('./pages/teachers/teachers.component').then(com => com.TeachersComponent),
            },
            {
                path: 'courses',
                loadComponent: () => import('./pages/courses/courses.component').then(com => com.CoursesComponent),
            },
            {
                path: 'course-detail',
                loadComponent: () => import('./pages/course-detail/course-detail.component').then(com => com.CourseDetailComponent),
            }
        ]
    },
];
