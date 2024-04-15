import {Component} from '@angular/core';
import {WaitingMessagesComponent} from './waiting-messages/waiting-messages.component';
import {ChatBoxComponent} from './chat-box/chat-box.component';

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [
        WaitingMessagesComponent,
        ChatBoxComponent
    ],
    templateUrl: './messages.component.html',
    styleUrl: './messages.component.scss'
})
export class MessagesComponent {

}
