import {Component, input} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../states/app.state';
import {Course} from "@model/course.interface";
import {addCourse} from '../../../states/cart/cart.action';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
    course = input.required<Course>();

    constructor(private store: Store<AppState>) {
    }

    onAddToCart() {
        this.store.dispatch(addCourse({ course: this.course() }));
    }
}
