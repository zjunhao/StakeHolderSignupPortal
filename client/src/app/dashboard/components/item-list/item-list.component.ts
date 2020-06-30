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

  listItems: ListItemModel[];

  @Input() editMode: boolean;

  constructor(
    private dashBoardService: DashboardService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.dashBoardService.getSprintReviewList().subscribe(res => {
      if (res.success) {
        this.listItems = res.itemList;
      }
      // TODO: maybe display error messsage if retrieve sprint review list fails
    });
  }

  navigateToSprintReviewDetail(id: string) {
    const link = ['/itemdetail', id];
    let navigationExtras: NavigationExtras = {
      queryParams: { 'editMode': this.editMode }
    };
    
    this.router.navigate(link, navigationExtras);
  }

  deleteSprintReview($event, id:string) {
    // prevent click event from bubbling up to <tr>
    $event.stopPropagation();
    // TODO: promp user to confirm delete
    this.dashBoardService.deleteSprintReview(id).subscribe(res => {
      if (res.success) {
        this.refreshList();
      }
      // TODO: maybe display error message when fail to delete sprint review
    });
  }
}
