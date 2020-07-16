import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filtered-item-list',
  templateUrl: './filtered-item-list.component.html',
  styleUrls: ['./filtered-item-list.component.scss']
})
export class FilteredItemListComponent implements OnInit {

  @Input() editMode: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
