import { Component, OnInit } from '@angular/core';
import { MatListOption } from '@angular/material/list'
import { LISTITEMS } from '../../../../assets/mock-data/mock-list-items';
import { ListItemModel } from '../../models/list-item-model';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  listItems: ListItemModel[] = LISTITEMS;

  constructor(
    private dashBoardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.refreshList();
  }

  onSelectionChange(selectedOptions: MatListOption[]) {
    // we don't support multiple selection, so selectedOptions will only have 1 element.
    const selectedItemId = selectedOptions[0].value;
    const link = ['/itemdetail', selectedItemId];
    this.router.navigate(link);
  }

  refreshList() {
    this.dashBoardService.getSprintReviewList().subscribe(listItems => (this.listItems = listItems));
  }
}
