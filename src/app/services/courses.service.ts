import {Injectable} from '@angular/core';
import {CourseControllerService} from '@server/course-controller.service';
import {Observable} from 'rxjs';
import {Course} from '@model/course.interface';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    constructor(private courseControllerService: CourseControllerService) {
    }

    getCoursesApi(): Observable<Course[]> {
        return this.courseControllerService.getCourses();
    }

}
