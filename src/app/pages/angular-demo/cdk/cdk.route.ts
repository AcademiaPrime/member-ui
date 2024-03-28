import {Route} from '@angular/router';

export const CDK_ROUTES: Route[] = [
    {
        path: 'overlay',
        loadComponent: () => import ('./overlay/overlay.component').then(com => com.OverlayComponent)
    },
];
