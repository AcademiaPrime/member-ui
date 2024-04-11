import {Route} from '@angular/router';

export const ANGULAR_DEMO_ROUTES: Route[] = [
    {
        path: 'animation',
        loadComponent: () => import ('../angular-demo/angular-demo.component').then(com => com.AngularDemoComponent)
    },
    {
        path: 'cdk',
        loadComponent: () => import ('./cdk/cdk.component').then(com => com.CdkComponent),
        loadChildren: () => import('./cdk/cdk.route').then(mod => mod.CDK_ROUTES)
    }
];
