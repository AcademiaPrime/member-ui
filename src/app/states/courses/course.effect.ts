import {Injectable} from '@angular/core';
import {createEffect, ofType, OnInitEffects, ROOT_EFFECTS_INIT, Actions} from '@ngrx/effects';
import {LocalStorageService} from '../../services/local-storage.service';
import {CoursesService} from '../../services/courses.service';
import {exhaustMap, map} from 'rxjs';
import * as CourseActions from './course.action';

@Injectable()
export class CourseEffect{

    init$ = createEffect(() => {
        this.actions$.pipe(
            ofType(ROOT_EFFECTS_INIT),
            exhaustMap(() => {
                return this.coursesService.getCoursesApi().pipe(
                    map(courses => {
                        return CourseActions.loadCourses({courses: courses});
                    })
                );
            })
        );
    });

    constructor(
        private actions$: Actions,
        private coursesService: CoursesService
    ) {}

}
