import {createActionGroup, emptyProps} from '@ngrx/store';

export enum LayoutActionsKeys {
    LOGIN = 'Layout Service'
}

export const LayoutActions = createActionGroup({
    source: LayoutActionsKeys.LOGIN,
    events: {
        switchToLightTheme: emptyProps(),
        switchToDarkTheme: emptyProps(),
        showExtendMenu: emptyProps(),
        hideExtendMenu: emptyProps(),
    }
});

