import {Injectable} from '@angular/core';
import {createEffect, ofType, Actions, OnInitEffects} from '@ngrx/effects';
import {CoursesService} from '../../services/courses.service';
import {exhaustMap, map} from 'rxjs';
import * as CourseActions from './course.action';
import {Action} from '@ngrx/store';

@Injectable()
export class CourseEffect implements OnInitEffects{

    init$ = createEffect(() => {
        return this.actions$.pipe(
            ofType('[Course/API] Load Courses'),
            exhaustMap(() => {
                return this.coursesService.getCoursesApi().pipe(
                    map(courses => {
                        return CourseActions.loadCoursesSuccessfully({courses: courses});
                    })
                );
            })
        );
    });

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService
    ) { }

    ngrxOnInitEffects(): Action {
        return { type: '[Course/API] Load Courses' };
    }

}
