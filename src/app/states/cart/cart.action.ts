import { createAction, props } from '@ngrx/store';
import {Course} from '@model/course.interface';

export const addCourse = createAction(
    ' [ Course Page | Courses Component ] Add Course',
    props<{ course: Course }>()
);

export const removeCourse = createAction(
    '[ Cart Component ] Remove Course',
    props<{ courseId: number }>()
);

export const increaseCourse = createAction(
    '[ Cart Component ] Increase Course',
    props<{ courseId: number }>()
);

export const decreaseCourse = createAction(
    '[ Cart Component ] Decrease Course',
    props<{ courseId: number }>()
);


export const clearCart = createAction(
    ' [ Cart Component ] Clear Courses'
)
