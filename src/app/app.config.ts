import {ApplicationConfig, importProvidersFrom, isDevMode} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideState, provideStore} from '@ngrx/store';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {counterReducer} from './states/counter/counter.reducer';
import {cartFeature} from './states/cart/cart.reducer';
import {HttpClientModule} from '@angular/common/http';
import {userFeature} from './states/authorization/authorization.reducer';
import {provideEffects} from '@ngrx/effects';
import {AuthorizationEffect} from './states/authorization/authorization.effect';
import { provideStoreDevtools } from '@ngrx/store-devtools';


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
    provideEffects(AuthorizationEffect),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
