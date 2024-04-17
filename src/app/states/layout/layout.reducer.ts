import { createReducer, createFeature, on } from '@ngrx/store';
import {LayoutActions} from '@states/layout/layout.action';

interface State {
    lightTheme: boolean;
    showExtendMenu: boolean;
}

const initialState: State = {
    lightTheme: true,
    showExtendMenu: false,
};

const layoutReducer = createReducer(
    initialState,
    on(LayoutActions.switchToLightTheme, ( state ) => {
        return { ...state, lightTheme: true };
    }),
    on(LayoutActions.switchToDarkTheme, ( state ) => {
        return { ...state, lightTheme: false };
    }),
    on(LayoutActions.showExtendMenu, ( state ) => {
        return { ...state, showExtendMenu: true };
    }),
    on(LayoutActions.hideExtendMenu, ( state ) => {
        return { ...state, showExtendMenu: false };
    }),

);

export const layoutFeature = createFeature({
    name: 'layout',
    reducer: layoutReducer
});
