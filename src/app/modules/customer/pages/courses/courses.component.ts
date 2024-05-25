import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import {CourseComponent} from './course/course.component';
import {Course} from '@model/course.interface';
import FakeCourses from '@mock/courses.json';
import {CoursesService} from '../../../../services/courses.service';
import {SidebarComponent} from './sidebar/sidebar.component';

@Component({
    selector: 'app-courses',
    standalone: true,
    imports: [
        CourseComponent,
        SidebarComponent
    ],
    providers: [CoursesService],
    templateUrl: './courses.component.html',
    styleUrl: './courses.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit{
    courses = signal<Course[]>(FakeCourses as Course[]);

    constructor(private coursesService: CoursesService) {
    }

    ngOnInit() {
        this.coursesService.getCoursesApi().subscribe(res => {
            console.log(res);
        });
    }

}
