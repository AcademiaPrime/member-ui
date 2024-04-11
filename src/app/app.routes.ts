import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import ('./modules/dashboard/dashboard.route').then(routes => routes.DASHBOARD_ROUTES),
    },
    {
        path: 'customer',
        loadChildren: () => import ('./modules/customer/customer.route').then(routes => routes.CUSTOMER_ROUTES),
    }
];
