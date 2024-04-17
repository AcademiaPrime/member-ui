import {Component} from '@angular/core';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {HeroBannerComponent} from './layout/hero-banner/hero-banner.component';
import {RouterOutlet} from '@angular/router';
import {NavigationService} from './services/navigation.service';
import {LeftMenuComponent} from './layout/left-menu/left-menu.component';
import {Store} from '@ngrx/store';
import {layoutFeature} from '@states/layout/layout.reducer';
import {AsyncPipe} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {openClosedAnimations} from './layout/header/animation';

@Component({
    selector: 'app-main-pages',
    standalone: true,
    imports: [
        FooterComponent,
        HeaderComponent,
        HeroBannerComponent,
        RouterOutlet,
        LeftMenuComponent,
        AsyncPipe
    ],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss',
    providers: [NavigationService],
    animations: openClosedAnimations
})
export class CustomerComponent {

    showExtendLeftMenu = false;

    constructor(private store: Store) {
        this.store.select(layoutFeature.selectShowExtendMenu).subscribe(res => {
            this.showExtendLeftMenu = res;
        });
    }
}
