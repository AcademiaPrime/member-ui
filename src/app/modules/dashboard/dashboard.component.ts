import {Component} from '@angular/core';
import {HeaderComponent} from './layout/header/header.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {CardVisitComponent} from './layout/card-visit/card-visit.component';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        HeaderComponent,
        SidebarComponent,
        RouterOutlet,
        CardVisitComponent
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
