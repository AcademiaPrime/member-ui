import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {CourseComponent} from './course/course.component';
import {Course} from '@model/course.interface';
import FakeCourses from '@mock/courses.json';
import {CoursesService} from '../../../../services/courses.service';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        CourseComponent
    ],
    providers: [CoursesService],
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit{
    // @ts-ignore
    courses = signal<Course[]>(FakeCourses);

    constructor(private coursesService: CoursesService) {
    }

    ngOnInit() {
        this.coursesService.getCoursesApi().subscribe(res => {
            console.log('res: ', res);
        });
    }

}
