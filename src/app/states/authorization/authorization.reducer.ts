import { createReducer, createFeature, on } from '@ngrx/store';
import { LoginActions } from './authorization.action';
import {User} from "@model/user.interface";

interface State {
    user: User | null;
};

const initialState: State = {
    user: null,
}

const userReducer = createReducer(
    initialState,
    on( LoginActions.authorizeSuccess, ( state, { user } ) => {
        return { ...state, user };
    } ),
    on( LoginActions.authorizeFailed, ( state ) => {
        return { ...state, user: null };
    } ),
    on( LoginActions.loadUserSuccess, ( state, { user } ) => {
        return { ...state, user };
    } )
);

export const userFeature = createFeature({
    name: 'user',
    reducer: userReducer
});
