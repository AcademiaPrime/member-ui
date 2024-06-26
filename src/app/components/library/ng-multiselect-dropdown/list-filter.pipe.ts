/* eslint-disable @typescript-eslint/no-explicit-any */

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'multiSelectFilter',
    standalone: true
})
export class ListFilterPipe implements PipeTransform {

    transform(items: any[], keySearch: string, propertyFilter: string): any[] {
        if ( !items || !keySearch ) {
            return items;
        }

        return items.filter(item => this.applyFilter(item, keySearch, propertyFilter));
    }

    private applyFilter(item: any, keySearch: string, propertyFilter: string): boolean {
        if ( typeof item === 'object') {
            return !(keySearch && item[propertyFilter] && item[propertyFilter].toString().toLowerCase().indexOf(keySearch.toString().toLowerCase()) === -1);
        }

        return !(keySearch && item.toString().toLowerCase().indexOf(keySearch.toString().toLowerCase()) === -1);
    }

}
