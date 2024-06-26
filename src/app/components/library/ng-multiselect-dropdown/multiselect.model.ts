export interface IDropdownSettings {
    singleSelection?: boolean;
    idField: string;
    textField: string;
    disabledField?: string;
    enableCheckAll?: boolean;
    selectAllText?: string;
    unSelectAllText?: string;
    allowSearchFilter?: boolean;
    clearSearchFilter?: boolean;
    maxHeight?: number;
    itemsShowLimit: number;
    limitSelection?: number;
    searchPlaceholderText?: string;
    noDataAvailablePlaceholderText?: string;
    noFilteredDataAvailablePlaceholderText?: string;
    closeDropDownOnSelection?: boolean;
    showSelectedItemsAtTop?: boolean;
    defaultOpen?: boolean;
    allowRemoteDataSearch?: boolean;
    customClass?: string;
    customResultWrapperClass?: string;
    showCaret?: boolean;
}

export class ListItem {
    id: string | number = '';
    text: string | number = '';
    isDisabled?: boolean = false;

    public constructor(source: string | number | ListItem) {
        if (typeof source === 'string' || typeof source === 'number') {
            this.id = this.text = source;
            this.isDisabled = false;
        }
        if (typeof source === 'object') {
            this.id = source.id;
            this.text = source.text;
            this.isDisabled = source.isDisabled;
        }
    }
}
