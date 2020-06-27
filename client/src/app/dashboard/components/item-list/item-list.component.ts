import { Component, OnInit, Input } from '@angular/core';
import { MatListOption } from '@angular/material/list'
import { Router, NavigationExtras } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { ListItemModel } from '../../models/item-list-response-model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  // // position control for tooltip
  // tooltipAfterPosition = new FormControl('after');

  listItems: ListItemModel[];

  @Input() editMode: boolean;

  constructor(
    private dashBoardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  onSelectionChange(selectedOptions: MatListOption[]) {
    // we don't support multiple selection, so selectedOptions will only have 1 element.
    const selectedItemId = selectedOptions[0].value;
    const link = ['/itemdetail', selectedItemId];
    let navigationExtras: NavigationExtras = {
      queryParams: { 'editMode': this.editMode }
    };
    
    this.router.navigate(link, navigationExtras);
  }

  refreshList() {
    this.dashBoardService.getSprintReviewList().subscribe(res => {
      if (res.success) {
        this.listItems = res.itemList;
      }
      // TODO: maybe display error messsage if retrieve sprint review list fails
    });
  }

  deleteSprintReview($event, _id:string) {
    // TODO: promp user to confirm delete
    // prevent event from bubbling up to <mat-selection-list> in template
    $event.stopPropagation();
    this.dashBoardService.deleteSprintReview(_id).subscribe(res => {
      if (res.success) {
        this.refreshList();
      }
      // TODO: maybe display error message when fail to delete sprint review
    });
  }
}
