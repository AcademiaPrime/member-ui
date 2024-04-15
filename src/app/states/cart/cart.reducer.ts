import {createFeature, createReducer, on} from '@ngrx/store';
import * as CartActions from './cart.action';
import { Course } from '@model/course.interface';

export interface CartState {
    courses: Course[];
    totalPrice: number;
}

export const initialCartState: CartState = {
    courses: [],
    totalPrice: 0,
};

function calculateTotalPrice(courses: Course[]): number {
    return courses.reduce(
        (accumulator, currentCourse) => accumulator + currentCourse.price * currentCourse.quantity,
        0
    );
}

function addCourse( initialCartState: CartState, course: Course ): CartState {
    const tempInitialCartState: CartState = JSON.parse(JSON.stringify(initialCartState));

    const index = tempInitialCartState.courses.findIndex(item => course.id === item.id);

    if ( index >= 0 ) {
        tempInitialCartState.courses[index].quantity += course.quantity;
    } else {
        tempInitialCartState.courses.push(course);
    }

    tempInitialCartState.totalPrice += course.price;
    return tempInitialCartState;
}

function removeCourse( initialCartState: CartState, courseId: number ): CartState {
    const tempInitialCartState: CartState = JSON.parse(JSON.stringify(initialCartState));

    tempInitialCartState.courses = tempInitialCartState.courses.filter(course => course.id !== courseId);
    tempInitialCartState.totalPrice = calculateTotalPrice(tempInitialCartState.courses);

    return tempInitialCartState;
}

function increaseCourse( initialCartState: CartState, courseId: number ): CartState {
    const tempInitialCartState: CartState = JSON.parse(JSON.stringify(initialCartState));

    const index = tempInitialCartState.courses.findIndex(item => courseId === item.id);

    if ( index >= 0 ) {
        tempInitialCartState.courses[index].quantity++;
    }

    tempInitialCartState.totalPrice += tempInitialCartState.courses[index].price;
    return tempInitialCartState;
}

function decreaseCourse( initialCartState: CartState, courseId: number ): CartState {
    const tempInitialCartState: CartState = JSON.parse(JSON.stringify(initialCartState));

    const tempCourses: Course[] = [];
    tempInitialCartState.courses.forEach(course => {
        if ( course.id === courseId ) {
           if ( course.quantity > 1 ) {
               course.quantity--;
               tempCourses.push(course);
           }
        } else {
           tempCourses.push(course);
        }
    });

    tempInitialCartState.totalPrice = calculateTotalPrice(tempInitialCartState.courses);
    return tempInitialCartState;
}

function clearCart( ): CartState {
    return { courses: [], totalPrice: 0 };
}

export const cartReducer = createReducer(
    initialCartState,
    on(CartActions.addCourse, (state, {course}) => addCourse(state, course)),
    on(CartActions.removeCourse, (state, {courseId}) => removeCourse(state, courseId)),
    on(CartActions.increaseCourse, (state, {courseId}) => increaseCourse(state, courseId)),
    on(CartActions.decreaseCourse, (state, {courseId}) => decreaseCourse(state, courseId)),
    on(CartActions.clearCart, () => clearCart()),
);

export const cartFeature = createFeature({
    name: 'cartFeature',
    reducer: cartReducer
});
