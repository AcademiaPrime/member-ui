/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter, HostListener,
    Input,
    Output,
    TemplateRef,
    forwardRef, Provider, OnChanges, SimpleChanges
} from '@angular/core';
import {ClickOutsideDirective} from './click-outside.directive';
import {IDropdownSettings, ListItem} from './multiselect.model';
import {ListFilterPipe} from './list-filter.pipe';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


const noop = () => { };
export const DROPDOWN_CONTROL_VALUE_ACCESSOR: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgMultiselectDropdownComponent),
    multi: true,
};

@Component({
    selector: 'app-ng-multiselect-dropdown',
    standalone: true,
    imports: [
        ClickOutsideDirective,
        CommonModule,
        ListFilterPipe,
        FormsModule,
    ],
    templateUrl: './ng-multiselect-dropdown.component.html',
    styleUrl: './ng-multiselect-dropdown.component.scss',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ListFilterPipe, DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class NgMultiselectDropdownComponent implements ControlValueAccessor {

    _data: any[] = [];
    selectedItems: any[] | any= [];
    _placeholder = 'Select';
    filter: ListItem = new ListItem('');
    keySearch = '';
    defaultSettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'text',
        disabledField: 'isDisabled',
        enableCheckAll: false,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: false,
        limitSelection: -1,
        clearSearchFilter: true,
        maxHeight: 197,
        itemsShowLimit: 3,
        searchPlaceholderText: 'Search',
        noDataAvailablePlaceholderText: 'No data available',
        noFilteredDataAvailablePlaceholderText: 'No filtered data available',
        closeDropDownOnSelection: true,
        showSelectedItemsAtTop: false,
        defaultOpen: false,
        allowRemoteDataSearch: false,
        customClass: '',
        customResultWrapperClass: '',
        showCaret: true,
    };
    _settings: IDropdownSettings = Object.assign({}, this.defaultSettings);
    @Input() dropdownMinWidth = '210px';

    @Input()
    public set singleSelection(val: boolean) {
        this._settings.singleSelection = Boolean(val);
    }
    @Input()
    public set idField(val: string) {
        this._settings.idField = val ? val.toString() : 'id';
    }
    @Input()
    public set textField(val: string) {
        this._settings.textField = val ? val.toString() : 'text';
    }
    @Input()
    public set itemsShowLimit(val: number) {
        this._settings.itemsShowLimit = val ?? 3;
    }
    @Input()
    public set allowSearchFilter(val: boolean) {
        this._settings.allowSearchFilter = Boolean(val);
    }
    @Input()
    public set enableCheckAll(val: boolean) {
        this._settings.enableCheckAll = Boolean(val);
    }
    @Input()
    public set showCaret(val: boolean) {
        this._settings.showCaret = Boolean(val);
    }
    @Input()
    public set customClass(val: string) {
        this._settings.customClass = val ?? '';
    }
    @Input()
    public set customResultWrapperClass(val: string) {
        this._settings.customResultWrapperClass = val ?? '';
    }
    @Input()
    public set placeholder(value: string) {
        if (value) {
            this._placeholder = value;
        } else {
            this._placeholder = 'Select';
        }
    }
    @Input() disabled = false;

    @Input()
    public set settings(value: IDropdownSettings) {
        if (value) {
            this._settings = Object.assign(this.defaultSettings, value);
        } else {
            this._settings = Object.assign(this.defaultSettings);
        }
    }

    @Input()
    public set data(val: unknown[]) {
        if (!this._settings) {
            console.error('Settings is not defined ot it needs to put it before data prop');
        }
        if (!val) {
            this._data = [];
        } else {
            this._data = JSON.parse(JSON.stringify(val));
        }
    }
    @ContentChild('optionsTemplate') optionsTemplateRef!: TemplateRef<any>;
    @ContentChild('optionSelectedTemplate') optionSelectedTemplateRef!: TemplateRef<any>;

    @Output() dropDownClose: EventEmitter<ListItem> = new EventEmitter<ListItem>();
    @Output() select: EventEmitter<any> = new EventEmitter<any>();
    @Output() deSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() selectAll: EventEmitter<ListItem[]> = new EventEmitter<ListItem[]>();
    @Output() deSelectAll: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    onFilterTextChange(keySearch: string) {
        this.search.emit(keySearch);
    }

    constructor(
        private listFilterPipe: ListFilterPipe,
        private cdr: ChangeDetectorRef
    ) { }

    onItemClick($event: any, item: any) {
        if (this.disabled || item.isDisabled) return;

        if (this._settings.singleSelection) {
            if ( JSON.stringify(item) !== JSON.stringify(this.selectedItems) ) {
                this.addSelected(item);
            }
        } else {
            const found = this.isSelected(item);
            const allowAdd =
                this._settings.limitSelection === -1 ||
                (this._settings.limitSelection && this._settings.limitSelection > 0 &&
                    this.selectedItems.length < this._settings.limitSelection);
            if (!found) {
                if (allowAdd) {
                    this.addSelected(item);
                }
            } else {
                this.removeSelected(item);
            }
        }
        if (
            this._settings.singleSelection &&
            this._settings.closeDropDownOnSelection
        ) {
            this.closeDropdown();
        }
    }

    writeValue(value: unknown) {
        if (value !== undefined && value !== null) {
            if (this._settings.singleSelection) {
                this.selectedItems = JSON.parse(JSON.stringify(value));
            } else {
                const _data = JSON.parse(JSON.stringify(value));
                if (this._settings.limitSelection && this._settings.limitSelection > 0) {
                    this.selectedItems = _data.splice(0, this._settings.limitSelection);
                } else {
                    this.selectedItems = _data;
                }
            }
        } else {
            this.selectedItems = [];
        }
        this.onChangeCallback(value);

        this.cdr.markForCheck();
    }

    // From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    // From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    // Set touched on blur
    @HostListener('blur')
    public onTouched() {
        this.onTouchedCallback();
    }

    isSelected(clickedItem: any) {
        if ( !this._settings.singleSelection && Array.isArray(this.selectedItems) ) {
            let found = false;
            this.selectedItems.forEach((item) => {
                if (clickedItem[this._settings.idField] === item[this._settings.idField]) {
                    found = true;
                }
            });
            return found;
        } else {
            return (clickedItem[this._settings.idField] ?? clickedItem) === (this.selectedItems[this._settings.idField] ?? this.selectedItems);
        }
    }

    isLimitSelectionReached(): boolean {
        return this._settings.limitSelection === this.selectedItems.length;
    }

    isAllItemsSelected(): boolean {
        const filteredItems = this.listFilterPipe.transform(this._data, this.keySearch, this._settings.textField);
        const itemDisabledCount = filteredItems.filter((item) => item.isDisabled).length;
        if (
            (!this.data || this.data.length === 0) &&
            this._settings.allowRemoteDataSearch
        ) {
            return false;
        }
        return (
            filteredItems.length === this.selectedItems.length + itemDisabledCount
        );
    }

    itemShowRemaining(): number {
        if (Array.isArray(this.selectedItems)) {
            return this.selectedItems.length - this._settings.itemsShowLimit;
        }

        return 0;
    }

    addSelected(item: any) {
        if (this._settings.singleSelection) {
            this.selectedItems = item;
        } else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.selectedItems);
        this.select.emit(item);
    }

    removeSelected(itemSel: any) {
        if (Array.isArray(this.selectedItems)) {
            this.selectedItems.forEach((item) => {
                if (itemSel[this._settings.idField] === item[this._settings.idField]) {
                    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
                }
            });
        }

        this.onChangeCallback(this.selectedItems);
        this.deSelect.emit(itemSel);
    }



    toggleDropdown(evt: MouseEvent) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this._settings.defaultOpen = !this._settings.defaultOpen;
        if (!this._settings.defaultOpen) {
            this.dropDownClose.emit();
        }
    }

    closeDropdown() {
        this._settings.defaultOpen = false;
        // clear search text
        if (this._settings.clearSearchFilter) {
            this.filter.text = '';
        }
        this.dropDownClose.emit();
    }

    toggleSelectAll() {
        if (this.disabled) return;

        if (!this.isAllItemsSelected()) {
            // filter out disabled item first before slicing
            this.selectedItems = this.listFilterPipe
                .transform(this._data, this._settings.textField, this.keySearch)
                .filter((item: ListItem) => !item.isDisabled)
                .slice();
            this.selectAll.emit(this.selectedItems);
        } else {
            this.selectedItems = [];
            this.deSelectAll.emit(this.selectedItems);
        }
        this.onChangeCallback(this.selectedItems);
    }
}
