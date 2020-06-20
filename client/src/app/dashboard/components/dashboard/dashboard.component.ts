import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  @ViewChild(ItemListComponent) itemList: ItemListComponent;

  constructor() { }

  ngOnInit(): void {
  }

  refreshList() {
    this.itemList.refreshList();
  }
}
