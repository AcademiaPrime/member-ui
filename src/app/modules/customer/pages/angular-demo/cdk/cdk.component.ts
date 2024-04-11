import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-cdk',
    standalone: true,
    imports: [
        RouterOutlet,
    ],
    templateUrl: './cdk.component.html',
    styleUrl: './cdk.component.scss'
})
export class CdkComponent {

}
