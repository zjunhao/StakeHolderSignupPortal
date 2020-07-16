import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { ApiListItemModel, ListItemModel } from '../../models/item-list-response-model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

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

  navigateToSprintReviewDetail(id: string) {
    const link = ['/itemdetail', id];
    this.router.navigate(link);
  }

  deleteSprintReview($event, id:string) {
    // prevent click event from bubbling up to <tr>
    $event.stopPropagation();

    // prompt user to confirm delete
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {  
      data: {
        message: "This sprint review will be permanently deleted, are you sure?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // if result is true from delete confirmation dialog, delete the sprint review
        this.dashBoardService.deleteSprintReview(id).subscribe(res => {
          if (res.success) {
            this.refreshList();
          }
          // TODO: maybe display error message when fail to delete sprint review
        });
      }
    });
  }
}
