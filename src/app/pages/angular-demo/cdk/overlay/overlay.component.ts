import {Component, ViewChild} from '@angular/core';
import {CdkConnectedOverlay, CdkOverlayOrigin, Overlay, OverlayConfig} from '@angular/cdk/overlay';
import {CdkPortal, PortalModule} from "@angular/cdk/portal";
import {FormLoginComponent} from "./form-login/form-login.component";

@Component({
    selector: 'app-overlay',
    standalone: true,
    imports: [
        PortalModule,
        // Components
        FormLoginComponent,
        CdkConnectedOverlay,
        CdkOverlayOrigin
    ],
    templateUrl: './overlay.component.html',
    styleUrl: './overlay.component.scss'
})
export class OverlayComponent {

    // @ViewChild(CdkPortal) portal!: CdkPortal;

    protected detailsOpen = false;
    constructor(private overlay: Overlay) {
    }

    // openModal() {
    //     const config = new OverlayConfig({
    //        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    //        width: '60%',
    //        hasBackdrop: true
    //     });
    //
    //     const overlayRef = this.overlay.create(config);
    //     overlayRef.attach(this.portal);
    //     overlayRef.backdropClick().subscribe(() => overlayRef.detach())
    // }
}
