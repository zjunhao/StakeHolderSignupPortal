import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ListItemModel } from 'src/app/dashboard/models/item-list-response-model';

@Component({
  selector: 'app-item-display',
  templateUrl: './item-display.component.html',
  styleUrls: ['./item-display.component.scss']
})
export class ItemDisplayComponent implements OnInit {

  @Input() editMode: boolean;
  @Input() listItems: ListItemModel[];

  // emit item id to navigate to
  @Output() navigate: EventEmitter<{itemId: string}> = new EventEmitter();
  // emit item id to delete
  @Output() delete: EventEmitter<{itemId: string}> = new EventEmitter();
 
  constructor() { }

  ngOnInit(): void {
  }

  onListItemClick(id: string) {
    this.navigate.emit({itemId: id});
  }

  onListItemDelete($event, id:string) {
    // prevent click event from bubbling up to <tr>
    $event.stopPropagation();
    this.delete.emit({itemId: id});
  }
}
