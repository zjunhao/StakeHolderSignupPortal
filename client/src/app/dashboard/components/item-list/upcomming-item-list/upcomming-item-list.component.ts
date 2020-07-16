import { Component, OnInit, Input } from '@angular/core';
import { ListItemModel } from 'src/app/dashboard/models/item-list-response-model';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-upcomming-item-list',
  templateUrl: './upcomming-item-list.component.html',
  styleUrls: ['./upcomming-item-list.component.scss']
})
export class UpcommingItemListComponent implements OnInit {

  listItems: ListItemModel[];

  @Input() editMode: boolean;

  constructor(
    private dashBoardService: DashboardService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.dashBoardService.getSprintReviewList().subscribe(
      listItems => {
        this.listItems = listItems;
      }, 
      err => {
        // TODO: maybe display error messsage if retrieve sprint review list fails
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
        this.dashBoardService.deleteSprintReview($event.itemId).subscribe(res => {
          if (res.success) {
            this.refreshList();
          }
          // TODO: maybe display error message when fail to delete sprint review
        });
      }
    });
  }
}
