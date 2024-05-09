import {ChangeDetectionStrategy, Component, OnInit, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
// Models
import {Word} from '@model/word';
// Fake Data
import {ModalService} from './components/modal/modal-service.service';
import {Store} from '@ngrx/store';
import {
    NgMultiselectDropdownComponent
} from './components/library/ng-multiselect-dropdown/ng-multiselect-dropdown.component';
import {IDropdownSettings, ListItem} from './components/library/ng-multiselect-dropdown/multiselect.model';
import {FormsModule} from '@angular/forms';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        FormsModule,
        // Components
        NgMultiselectDropdownComponent

    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    providers: [
        ModalService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit{
    title = 'member-ui';

    words: Word[] = [];

    constructor(
        private modalService: ModalService,
        private store: Store
    ) {}

    cities = [
        {
            item_id: 1,
            item_text: 'Vietnam Vietnam',
            image: 'http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg',
        },
        {
            item_id: 2,
            item_text: 'Spain',
            image: 'http://www.sciencekids.co.nz/images/pictures/flags96/Spain.jpg',
        },
        {
            item_id: 3,
            item_text: 'United Kingdom',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/United_Kingdom.jpg',
        },
        {
            item_id: 4,
            item_text: 'Canada',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Canada.jpg',
        },
        {
            item_id: 5,
            item_text: 'Israel',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Israel.jpg',
        },
        {
            item_id: 6,
            item_text: 'Brazil',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Brazil.jpg',
        },
        {
            item_id: 7,
            item_text: 'Barbados',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Barbados.jpg',
        },
        {
            item_id: 8,
            item_text: 'Mexico',
            image:
                'http://www.sciencekids.co.nz/images/pictures/flags96/Mexico.jpg',
        },
    ];
    selectedItems = [];
    singleSelectedItems = {
        item_id: 1,
        item_text: 'India',
        image: 'http://www.sciencekids.co.nz/images/pictures/flags96/India.jpg',
    };
    menus =  [
        'Currency Management',
        'Currency - Country Mapping',
        'Country - IP Mapping',
        'Liability Analysis',
        'Priority Settings',
        'Product Maintenance',
        'BetFair Account Info',
        'Betfair Information',
        'Provider Currency Mapping',
        'Betfair Tax re-crawl',
        'Betfair Profit & Loss',
        'Small Bet Configuration',
        'Liability Threshold Settings',
        'Agent PT Available Balance',
        'Wager Void / Un-void',
        'Live Streaming Management',
        'Event Page Configuration',
        'Announcement Management',
        'Banner Management',
        'Performance',
        'PT Configuration',
        'Extra Tax Configuration',
        'Whitelabel Creation',
        'Odds Spread Management',
        'VAM Override Setting',
        'Find Blocked Market',
        'Events/Markets Status',
        'Event/Market Log',
        'Blocking Settings',
        'Competition Blocking',
        'Liquidity Threshold Settings',
        'Liquidity Threshold Log',
        'Before Login Management',
        'Block/Unblock Events',
        'Fraud Detection',
        'Suspected Fraud Users',
        'Odds Matched History',
        'Wager Odds History',
        'Live Odds Chart',
        'Wager Resettlement ',
        'Resettlement/Void Log',
        'Settlement Settings',
        'Fancy Result',
        'Decimal Crickets Result',
        'Wager Settlement Info',
        'Add Partner ',
        'Partner Management ',
        'Player Transfer Log ',
        'Add Agent ',
        'Agent Management ',
        'Reset Account Password ',
        'Reopen User ',
        'Login Info ',
        'Player Info',
        'API Player',
        'Crypto Access Management ',
        'Atlantic Access Management ',
        'Suspend/Unsuspend User ',
        'VAM Report',
        'Win Loss Detail ',
        'Liability Forecast',
        'Master Sheet Report',
        'Master Sheet Configuration',
        'Provider Consumption',
        'Net Profit ',
        'Net Profit Configuration ',
        'Punter Performance ',
        'Top Winners /Losers',
        'Daily Member Performance',
        'Betfair Tax',
        'Exposure Analysis',
        'Market Bet List',
        'Player Transaction Export',
        'Event Mapping',
        'Update Market',
        'Admin Profile ',
        'Role Management ',
        'Admin User Management ',
        'Betfair Exchange APIs',
        'Whitelabel Domain',
        'Live Streaming Management History',
        'Line Blocking Settings',
        'IP Detection',
        'Online Users',
        'Daily Online Member',
        'Who\'s Online List',
        'Win Loss by Market',
        'Follow Bets to 3rd Party',
        'Hedging Configuration',
        'Late Bets',
        'Access Activity',
        'Follow Bets Information',
        'Hedging Account',
        'Account Balance Log',
        'Follow Bets History',
        'Account Negative Balance Log',
        'Brand Management',
        'DNS Management',
        'Portal Management',
        'Runner Status',
        'Veronica Settlement',
        'Clean Outstanding Casino',
        'Agent Balance',
        'Fancy Remark Log',
        'Product Setting',
        'Whitelabel List',
        'Edit Event Result',
        'Resettle Casino Bets'
    ];
    selectedMenu = '';

    ngOnInit() {}

    onItemSelect(item: ListItem) {
        console.log('select one: ', item);
    }
    onItemDeselect(item: any) {
        console.log('deselect one: ', item);
    }
    onSelectAll(items: any) {

        console.log('select all:', items);
    }
    onDeselectAll() {

        console.log('deselect all:');
    }
}
