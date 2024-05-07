import {Pipe, PipeTransform} from '@angular/core';
import {ListItem} from './multiselect.model';

@Pipe({
    name: 'multiSelectFilter',
    standalone: true
})
export class ListFilterPipe implements PipeTransform {

    transform(items: ListItem[], filter: ListItem): ListItem[] {
        if ( !items || !filter ) {
            return items;
        }

        return items.filter(item => this.applyFilter(item, filter));
    }

    private applyFilter(item: ListItem, filter: ListItem): boolean {
        return !(filter.text && item.text && item.text.toString().toLowerCase().indexOf(filter.text.toString().toLowerCase()) === -1);
    }

}
