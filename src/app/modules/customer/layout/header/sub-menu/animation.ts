import {animate, state, style, transition, trigger} from '@angular/animations';

const closedState = {
    visibility: 'hidden',
    transform: 'translateX(-20px)',
    opacity: 0
};

const openingState = {
    visibility: 'visible',
    transform: 'translateX(0)',
    opacity: 1
};

const timing = '0.3s ease-in';

export const openClosedAnimations = [
    trigger('openClosed', [
        state('closed', style(closedState)),
        state('open', style(openingState)),
        transition('closed <=> open', [
            animate(timing)
        ])
    ])
];
