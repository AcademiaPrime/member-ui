import {Injectable} from '@angular/core';
import courses from '@mock/courses.json';
import {Observable, of} from 'rxjs';
import {Course} from '@model/course.interface';

@Injectable({
    providedIn: 'root'
})
export class CourseControllerService {

    private readonly _courses: Course[];

    constructor() {
        this._courses = courses as Course[];
    }

    getCourses(): Observable<Course[]> {
        return of(this._courses ?? []);
    }
}
