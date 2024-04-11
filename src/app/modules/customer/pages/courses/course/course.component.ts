import {Component, input, signal, ViewChild} from '@angular/core';
import {CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition, Overlay} from '@angular/cdk/overlay';
import {CdkPortal, PortalModule} from '@angular/cdk/portal';
import {CourseDetailComponent} from '../course-detail/course-detail.component';
import {Course} from '@model/course.interface';
import {NgOptimizedImage} from '@angular/common';

@Component({
    selector: 'app-course',
    standalone: true,
    imports: [
        PortalModule,
        CourseDetailComponent,
        CdkOverlayOrigin,
        CdkConnectedOverlay,
        NgOptimizedImage
    ],
    templateUrl: './course.component.html',
    styleUrl: './course.component.scss'
})
export class CourseComponent {
    @ViewChild(CdkPortal) portal!: CdkPortal;

    course = input.required<Course>();

    openDetail = signal(false);
    connectedPosition = signal<ConnectedPosition[]>([
        {
            originX: 'end',
            originY: 'center',
            overlayY: 'center',
            overlayX: 'start',
        },
        {
            originX: 'start',
            originY: 'center',
            overlayY: 'center',
            overlayX: 'end',
        }
    ]);
    timerRef = signal(0);

    constructor(private overlay: Overlay) {
    }

    onToggleDetailPopup(open: boolean) {
        window.clearTimeout(this.timerRef());

        this.timerRef.set(window.setTimeout(() => {
            this.openDetail.update(_ => open);
        }, 50));
        // const config = new OverlayConfig({
        //     positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally(),
        //     hasBackdrop: true
        // });
        //
        // const overlayRef = this.overlay.create(config);
        // overlayRef.attach(this.portal);
        // overlayRef.backdropClick().subscribe(() => overlayRef.detach());
    }
}
