import {animate, style, transition, trigger} from '@angular/animations';

const hidden = {
    visibility: 'hidden',
    transform: 'translateY(20px)',
    opacity: 0
};

const visible = {
    visibility: 'visible',
    transform: 'translateY(0)',
    opacity: 1
};

const timing = '0.3s ease-in';

export const openClosedAnimations = [
    trigger('openClosed', [
        transition(':enter', [
            style(hidden),
            animate(timing, style(visible))
        ]),
        transition(':leave', [
            style(visible),
            animate(timing, style(hidden))
        ])
    ])
]
