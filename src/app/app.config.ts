
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {provideState, provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import {provideEffects} from '@ngrx/effects';

import {routes} from './app.routes';
import {counterReducer} from '@states/counter/counter.reducer';
import {userFeature} from '@states/authorization/authorization.reducer';
import {cartFeature,} from '@states/cart/cart.reducer';
import {layoutFeature} from '@states/layout/layout.reducer';
import {AuthorizationEffect} from '@states/authorization/authorization.effect';
import {coursesFeature} from '@states/courses/course.reducer';


export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(HttpClientModule),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideStore(),
        provideState({ name: 'counter', reducer: counterReducer }),
        // provideState({name: 'cart', reducer: cartReducer}),
        provideState(cartFeature),
        provideState(userFeature),
        provideState(layoutFeature),
        provideState(coursesFeature),
        provideEffects(AuthorizationEffect),
        provideStoreDevtools({ maxAge: 100, logOnly: !isDevMode() }),
        provideStore({router: routerReducer}),
        provideRouterStore()
    ]
};
