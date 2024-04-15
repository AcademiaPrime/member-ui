import {Component} from '@angular/core';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {HeroBannerComponent} from './layout/hero-banner/hero-banner.component';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-main-pages',
    standalone: true,
    imports: [
        FooterComponent,
        HeaderComponent,
        HeroBannerComponent,
        RouterOutlet
    ],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss'
})
export class CustomerComponent {

}
