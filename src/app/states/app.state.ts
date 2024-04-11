import {counterReducer, CounterState} from './counter/counter.reducer';
import {cartReducer, CartState} from './cart/cart.reducer';
import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";

export interface AppState {
    counter: CounterState,
    cart: CartState
}


export const reducers: ActionReducerMap<AppState> = {
    counter: counterReducer,
    cart: cartReducer
}

const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
    return ( state, action ) => {
        console.log('state: ', state);
        console.log('action: ', action);
        return reducer(state, action)
    }
}

export const metaReducers: MetaReducer<any>[] = [debug]
