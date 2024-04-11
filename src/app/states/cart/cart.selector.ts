import { createSelector } from '@ngrx/store';
import {AppState} from "../app.state";

export const selectCartState = ( state: AppState ) => state.cart;

export const selectCart = createSelector(
    selectCartState,
    (state) => state
)

export const selectCourse = createSelector(
    selectCartState,
    (state) => state.courses
);

export const selectTotalPrice = createSelector(
    selectCartState,
    (state) => state.totalPrice
)


