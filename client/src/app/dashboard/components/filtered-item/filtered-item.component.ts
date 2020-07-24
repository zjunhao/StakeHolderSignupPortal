import { Component, OnInit, Input } from '@angular/core';
import { ItemListQueryModel } from 'src/app/dashboard/models/item-list-query-model';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { ListItemModel } from 'src/app/dashboard/models/item-list-response-model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { UserService } from 'src/app/log-in/services/user.service';
import { UserPrivilegeEnum } from 'src/app/log-in/enums/user-privilege-enum';

@Component({
  selector: 'app-filtered-item',
  templateUrl: './filtered-item.component.html',
  styleUrls: ['./filtered-item.component.scss']
})
export class FilteredItemComponent implements OnInit {

  editMode: boolean;

  listItems: ListItemModel[];

  filterCondition: ItemListQueryModel = new ItemListQueryModel();

  errorMessage: string;
  itemListEmptyMessage: string;

  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUserInfo().subscribe( res => {
      if (res.success) {
        this.editMode = res.user.privilege.localeCompare(UserPrivilegeEnum.admin) === 0;
      } else {
        console.error('Fail to load current user information');
      }
    });
  }

  searchSprintReviews() {
    if (!this.filterCondition.maxTime && !this.filterCondition.minTime && !this.filterCondition.organizedBy) {
      this.errorMessage = "Conditions cannot all be empty."
      return;
    }

    this.dashboardService.getFilteredSprintReviewList(this.filterCondition).subscribe(
      listItems => {
        this.listItems = listItems;
        this.errorMessage = "";
        if (listItems.length === 0) {
          this.itemListEmptyMessage = "No sprint review matches your search."
        } else {
          this.itemListEmptyMessage = "";
        }
      },
      err => {
        this.errorMessage = err.message;
      }
    );

  }

  navigateToSprintReviewDetail($event) {
    const link = ['/itemdetail', $event.itemId];
    this.router.navigate(link);
  }

  deleteSprintReview($event) {
    // prompt user to confirm delete
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {  
      data: {
        message: "This sprint review will be permanently deleted, are you sure?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // if result is true from delete confirmation dialog, delete the sprint review
        this.dashboardService.deleteSprintReview($event.itemId).subscribe(res => {
          if (res.success) {
            this.searchSprintReviews();
          }
          // TODO: maybe display error message when fail to delete sprint review
        });
      }
    });
  }

}
