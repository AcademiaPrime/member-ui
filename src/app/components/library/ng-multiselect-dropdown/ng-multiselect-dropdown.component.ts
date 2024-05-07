import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter, HostListener,
    Input,
    Output,
    TemplateRef,
    forwardRef, Provider
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
    selector: 'ng-multiselect-dropdown',
    standalone: true,
    imports: [
        ClickOutsideDirective,
        CommonModule,
        ListFilterPipe,
        FormsModule,
    ],
    templateUrl: './ng-multiselect-dropdown.component.html',
    styleUrl: './ng-multiselect-dropdown.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ListFilterPipe, DROPDOWN_CONTROL_VALUE_ACCESSOR]
})
export class NgMultiselectDropdownComponent implements ControlValueAccessor {
    public _settings!: IDropdownSettings;
    public _data: Array<ListItem> = [];
    public selectedItems: Array<ListItem> = [];
    public isDropdownOpen = true;
    _placeholder = 'Select';
    private _sourceDataType: string | null = null;
    private _sourceDataFields: string[] = [];
    filter: ListItem = new ListItem('');
    defaultSettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'text',
        disabledField: 'isDisabled',
        enableCheckAll: true,
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: false,
        limitSelection: -1,
        clearSearchFilter: true,
        maxHeight: 197,
        itemsShowLimit: 999999999999,
        searchPlaceholderText: 'Search',
        noDataAvailablePlaceholderText: 'No data available',
        noFilteredDataAvailablePlaceholderText: 'No filtered data available',
        closeDropDownOnSelection: true,
        showSelectedItemsAtTop: false,
        defaultOpen: false,
        allowRemoteDataSearch: false,
    };

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
            const firstItem = val[0];
            this._sourceDataType = typeof firstItem;
            this._sourceDataFields = this.getFields(firstItem);
            this._data = val.map((item: unknown) =>
                typeof item === 'string' || typeof item === 'number'
                    ? new ListItem(item)
                    : new ListItem(this.getObject(item))
            );
        }
    }

    @ContentChild('optionsTemplate') optionsTemplateRef: TemplateRef<DocumentFragment> | null = null;
    @ContentChild('optionSelectedTemplate') optionSelectedTemplateRef: TemplateRef<DocumentFragment> | null = null;

    @Output('filterChange') onFilterChange: EventEmitter<ListItem> = new EventEmitter<ListItem>();
    @Output('dropDownClose') onDropDownClose: EventEmitter<ListItem> = new EventEmitter<ListItem>();
    @Output('select') onSelect: EventEmitter<ListItem> = new EventEmitter<ListItem>();
    @Output('deSelect') onDeSelect: EventEmitter<ListItem> = new EventEmitter<ListItem>();
    @Output('selectAll') onSelectAll: EventEmitter<ListItem[]> = new EventEmitter<ListItem[]>();
    @Output('deSelectAll')onDeSelectAll: EventEmitter<Array<ListItem>> = new EventEmitter<Array<ListItem>>();

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: any) => void = noop;

    onFilterTextChange(item: any) {
        this.onFilterChange.emit(item);
    }

    constructor(
        private listFilterPipe: ListFilterPipe,
        private cdr: ChangeDetectorRef
    ) { }

    onItemClick($event: any, item: ListItem) {
        if (this.disabled || item.isDisabled) return;

        if (this._settings.singleSelection) {
            if (item.id !== this.selectedItems[0].id) {
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
        if (value !== undefined && value !== null && Array.isArray(value) && value.length > 0) {
            if (this._settings.singleSelection) {
                try {
                    if (value.length >= 1) {
                        const firstItem = value[0];
                        this.selectedItems = [
                            typeof firstItem === 'string' || typeof firstItem === 'number'
                                ? new ListItem(firstItem)
                                : new ListItem({
                                    id: firstItem[this._settings.idField],
                                    text: firstItem[this._settings.textField],
                                    isDisabled: firstItem[this._settings.disabledField ?? ''],
                                }),
                        ];
                    }
                } catch (e) {
                    console.error((e as Error).message);
                }
            } else {
                const _data = value.map((item: any) =>
                    typeof item === 'string' || typeof item === 'number'
                        ? new ListItem(item)
                        : new ListItem({
                            id: item[this._settings.idField],
                            text: item[this._settings.textField],
                            isDisabled: item[this._settings.disabledField ?? ''],
                        })
                );
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
        // this.closeDropdown();
        this.onTouchedCallback();
    }

    isSelected(clickedItem: ListItem) {
        let found = false;
        this.selectedItems.forEach((item) => {
            if (clickedItem.id === item.id) {
                found = true;
            }
        });
        return found;
    }

    isLimitSelectionReached(): boolean {
        return this._settings.limitSelection === this.selectedItems.length;
    }

    isAllItemsSelected(): boolean {
        const filteredItems = this.listFilterPipe.transform(this._data, this.filter);
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
        return this.selectedItems.length - this._settings.itemsShowLimit;
    }

    addSelected(item: ListItem) {
        if (this._settings.singleSelection) {
            this.selectedItems = [];
            this.selectedItems.push(item);
        } else {
            this.selectedItems.push(item);
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onSelect.emit(this.emittedValue(item));
    }

    removeSelected(itemSel: ListItem) {
        this.selectedItems.forEach((item) => {
            if (itemSel.id === item.id) {
                this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
            }
        });
        this.onChangeCallback(this.emittedValue(this.selectedItems));
        this.onDeSelect.emit(this.emittedValue(itemSel));
    }

    emittedValue(val: any): any {
        const selected: any = [];
        if (Array.isArray(val)) {
            val.map((item) => {
                selected.push(this.objectify(item));
            });
        } else {
            if (val) {
                return this.objectify(val);
            }
        }
        return selected;
    }

    objectify(val: ListItem) {
        if (this._sourceDataType === 'object') {
            const obj: any = {};
            obj[this._settings.idField] = val.id;
            obj[this._settings.textField] = val.text;
            if (this._sourceDataFields.includes(this._settings.disabledField ?? '')) {
                obj[this._settings.disabledField ?? ''] = val.isDisabled;
            }
            return obj;
        } else {
            return val;
        }
    }

    toggleDropdown(evt: MouseEvent) {
        evt.preventDefault();
        if (this.disabled && this._settings.singleSelection) {
            return;
        }
        this._settings.defaultOpen = !this._settings.defaultOpen;
        if (!this._settings.defaultOpen) {
            this.onDropDownClose.emit();
        }
    }

    closeDropdown() {
        this._settings.defaultOpen = false;
        // clear search text
        if (this._settings.clearSearchFilter) {
            this.filter.text = '';
        }
        this.onDropDownClose.emit();
    }

    toggleSelectAll() {
        if (this.disabled) return;

        if (!this.isAllItemsSelected()) {
            // filter out disabled item first before slicing
            this.selectedItems = this.listFilterPipe
                .transform(this._data, this.filter)
                .filter((item: ListItem) => !item.isDisabled)
                .slice();
            this.onSelectAll.emit(this.emittedValue(this.selectedItems));
        } else {
            this.selectedItems = [];
            this.onDeSelectAll.emit(this.emittedValue(this.selectedItems));
        }
        this.onChangeCallback(this.emittedValue(this.selectedItems));
    }

    getFields(inputData: unknown): string[] {
        const fields: string[] = [];
        if (typeof inputData !== 'object') {
            return fields;
        }

        for (const prop in inputData) {
            fields.push(prop);
        }
        return fields;
    }

    private getObject(source: unknown): ListItem {
        return {
            id: (source as {[key: string]: string | number})[this._settings.idField],
            text: (source as {[key: string]: string | number})[this._settings.textField],
            isDisabled: (source as {[key: string]: boolean})[this._settings.disabledField ?? ''],
        };
    }
}
