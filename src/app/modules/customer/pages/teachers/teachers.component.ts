import {Component, signal} from '@angular/core';

@Component({
    selector: 'app-teachers',
    standalone: true,
    imports: [],
    templateUrl: './teachers.component.html',
    styleUrl: './teachers.component.scss'
})
export class TeachersComponent {

    teachers = signal<Teacher[]>([
        {
            id: 1,
            fullName: 'Alex Smith',
            avatar: 'https://techydevs.com/demos/themes/html/aduca-demo/aduca/images/small-avatar-1.jpg'
        },
        {
            id: 2,
            fullName: 'Rose Taylor',
            avatar: 'https://techydevs.com/demos/themes/html/aduca-demo/aduca/images/small-avatar-2.jpg'
        },
        {
            id: 3,
            fullName: 'Jef Collin',
            avatar: 'https://techydevs.com/demos/themes/html/aduca-demo/aduca/images/small-avatar-3.jpg'
        },
        {
            id: 4,
            fullName: 'Mike Hardson',
            avatar: 'https://techydevs.com/demos/themes/html/aduca-demo/aduca/images/small-avatar-4.jpg '
        },
        {
            id: 5,
            fullName: 'John Smith',
            avatar: 'https://techydevs.com/demos/themes/html/aduca-demo/aduca/images/small-avatar-5.jpg '
        },
        {
            id: 6,
            fullName: 'Kevin Martin',
            avatar: 'https://techydevs.com/demos/themes/html/aduca-demo/aduca/images/small-avatar-6.jpg '
        },
        {
            id: 7,
            fullName: 'Tisham Elerdy',
            avatar: 'https://techydevs.com/demos/themes/html/aduca-demo/aduca/images/small-avatar-7.jpg '
        },
        {
            id: 8,
            fullName: 'Alper Doein',
            avatar: 'https://techydevs.com/demos/themes/html/aduca-demo/aduca/images/small-avatar-8.jpg '
        },
        {
            id: 9,
            fullName: 'Alper Doein',
            avatar: 'https://techydevs.com/demos/themes/html/aduca-demo/aduca/images/small-avatar-8.jpg '
        },
        {
            id: 10,
            fullName: 'Alper Doein',
            avatar: 'https://techydevs.com/demos/themes/html/aduca-demo/aduca/images/small-avatar-8.jpg '
        }
    ]);
}

interface Teacher {
    id: number;
    fullName: string;
    avatar: string;
}
