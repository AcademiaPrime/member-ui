import {Component, signal} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {selectCart, selectCourse} from '@states/cart/cart.selector';

// Components
import {SubMenuComponent} from './sub-menu/sub-menu.component';
// Models
import {Menu, MenuState} from '@model/menu.interface';
import {cartFeature, CartState} from '@states/cart/cart.reducer';
// Animations
import {openClosedAnimations} from './animation';
import {AsyncPipe} from "@angular/common";
import {AppState} from "@states/app.state";
import {Course} from "@model/course.interface";
import {User} from "@model/user.interface";
import {userFeature} from "@states/authorization/authorization.reducer";


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        SubMenuComponent,
        AsyncPipe
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    animations: openClosedAnimations
})
export class HeaderComponent {
    readonly menuState = MenuState;
    course: Course[] = [];
    menus = signal<Menu[]>([
        {
            title: 'Categories',
            url: '',
            children: [
                {
                    title: 'Development',
                    url: '',
                    children: [
                        {title: 'All Development', url: '', children: []},
                        {title: 'Web Development', url: '', children: []},
                        {title: 'Mobile Apps', url: '', children: []},
                        {title: 'Game Development', url: '', children: []},
                        {title: 'Databases', url: '', children: []},
                        {title: 'Programming Languages', url: '', children: []},
                        {title: 'Software Testing', url: '', children: []},
                        {title: 'Software Engineering', url: '', children: []},
                        {title: 'E-commerce', url: '', children: []},
                    ]
                },
                {
                    title: 'Business',
                    url: '',
                    children: [
                        {title: 'All Business', url: '', children: []},
                        {title: 'Finance', url: '', children: []},
                        {title: 'Entrepreneurship', url: '', children: []},
                        {title: 'Strategy', url: '', children: []},
                        {title: 'Real Estate', url: '', children: []},
                        {title: 'Home Business', url: '', children: []},
                        {title: 'Communications', url: '', children: []},
                        {title: 'Industry', url: '', children: []},
                        {title: 'Other', url: '', children: []},
                    ]
                },
                {
                    title: 'IT & Software',
                    url: '',
                    children: [
                        {title: 'All IT & Software', url: '', children: []},
                        {title: 'IT Certification', url: '', children: []},
                        {title: 'Hardware', url: '', children: []},
                        {title: 'Network & Security', url: '', children: []},
                        {title: 'Operating Systems', url: '', children: []},
                        {title: 'Other', url: '', children: []},
                    ]
                },
                {
                    title: 'Finance & Accounting',
                    url: '',
                    children: [
                        {title: 'All Finance & Accounting', url: '', children: []},
                        {title: 'Accounting & Bookkeeping', url: '', children: []},
                        {title: 'Cryptocurrency & Blockchain', url: '', children: []},
                        {title: 'Economics', url: '', children: []},
                        {title: 'Investing & Trading', url: '', children: []}
                    ]
                },
                {
                    title: 'Design',
                    url: '',
                    children: [
                        {title: 'All Design', url: '', children: []},
                        {title: 'Graphic Design', url: '', children: []},
                        {title: 'Web Design', url: '', children: []},
                        {title: 'Design Tools', url: '', children: []},
                        {title: '3D & Animations', url: '', children: []},
                        {title: 'User Experience', url: '', children: []},
                        {title: 'Other', url: '', children: []},
                    ]
                },
                {
                    title: 'Personal Development',
                    url: '',
                    children: [
                        {title: 'All Personal Development', url: '', children: []},
                        {title: 'Personal Transformation', url: '', children: []},
                        {title: 'Productivity', url: '', children: []},
                        {title: 'Leadership', url: '', children: []},
                        {title: 'Personal Finance', url: '', children: []},
                        {title: 'Career Development', url: '', children: []},
                        {title: 'Parenting Relationships', url: '', children: []},
                        {title: 'Happiness', url: '', children: []},
                    ]
                }
            ]
        },
        {
            title: 'Home',
            url: '',
            children: [
                { title: 'Home One', url: '', children: [] },
                { title: 'Home Two', url: '', children: [] },
                { title: 'Home Three', url: '', children: [] },
                { title: 'Home Four', url: '', children: [] },
            ]
        },
        {
            title: 'Courses',
            url: '',
            children: [
                { title: 'Course Grid', url: '', children: [] },
                { title: 'Course List', url: '', children: [] },
                { title: 'Left Sidebar', url: '', children: [] },
                { title: 'Right Sidebar', url: '', children: [] },
                { title: 'Course Detail', url: '', children: [] },
                { title: 'Lesson Detail', url: '', children: [] },
                { title: 'My Courses', url: '', children: [] },
            ],
        },
        {
            title: 'Student',
            url: '',
            children: [
                { title: 'Student Detail', url: '', children: [] },
                { title: 'Take Quiz', url: '', children: [] },
                { title: 'Quiz Results', url: '', children: [] },
                { title: 'Quiz Detail', url: '', children: [] },
                { title: 'Quiz Detail2', url: '', children: [] },
                { title: 'Path Detail', url: '', children: [] },
                { title: 'Skill Assessment', url: '', children: [] },
                { title: 'Skill Result', url: '', children: [] },
            ]
        },
        {title: 'Pages', url: '', children: []},
        {
            title: 'Blog',
            url: '',
            children: [
                { title: 'Blog Full Width', url: '', children: [] },
                { title: 'Blog No Sidebar', url: '', children: [] },
                { title: 'Blog Left Sidebar', url: '', children: [] },
                { title: 'Blog Detail', url: '', children: [] },
            ]
        },
    ]);
    openingSubMenu = signal<Menu | null>(null);
    authorized = signal(false);
    user = signal<User | null>( null);

    constructor(private store: Store<AppState>) {
        this.store.select(cartFeature.selectCourses).subscribe(state => {
            this.course = state;
        });
        this.store.select(userFeature.selectUser).subscribe(user => {
            this.user.set(user);
        });

    }

    onToggleOpenSubMenu(subMenu: Menu | null) {
        this.openingSubMenu.set(subMenu);
    }
}
