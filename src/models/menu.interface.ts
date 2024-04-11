export interface Menu {
    title: string;
    url: string;
    children: Menu[];
}

export enum MenuState {
    OPEN = 'open', CLOSED = 'closed'
}
