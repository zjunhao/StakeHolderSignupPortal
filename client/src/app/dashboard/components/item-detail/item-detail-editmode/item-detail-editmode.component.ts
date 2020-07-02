import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { DetailItemModel } from 'src/app/dashboard/models/item-detail-response-model';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { FormControl, Validators } from '@angular/forms';
import { AdminAddAttendeeModel } from 'src/app/dashboard/models/admin-add-attendee-model';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from 'src/app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-item-detail-editmode',
  templateUrl: './item-detail-editmode.component.html',
  styleUrls: ['./item-detail-editmode.component.scss']
})
export class ItemDetailEditmodeComponent implements OnInit {
  // item detail subject to user's change
  itemDetail: DetailItemModel = new DetailItemModel();

  // original item detail without user making any changes
  itemDetailOriginal: DetailItemModel = new DetailItemModel();

  // variables related to admin adding attendee
  newAdminAttendee: AdminAddAttendeeModel = new AdminAddAttendeeModel();
  nameFC = new FormControl('', [Validators.required]);
  emailFC = new FormControl('', [Validators.required, Validators.email]);

  tooltipAfterPosition = new FormControl('after');

  totalSlotsErrMsg: string = '';

  @ViewChild('addAttendeeForm') addAttendeeForm: ElementRef;

  constructor(
    private dashBoardService: DashboardService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshItemDetail();
  }

  refreshItemDetail() {
    // request example like .../:id/?editMode=false
    // extract item id from request parameter
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.dashBoardService.getSprintReview(id).subscribe(res => {
          if(res.success) {
            this.itemDetail = res.itemDetail;
            // deep copy every field into iteDetailOriginal
            this.itemDetailOriginal = {
              ...this.itemDetail, 
              selfSignupAttendees: {...this.itemDetail.selfSignupAttendees},
              administratorAddedAttendees: {...this.itemDetail.administratorAddedAttendees},
            };
          }
          // TODO: notice user when get item detail fails
        });
      } 
    });
  }

  removeSelfSignupAttendee(attendeeId: string) {
    // prompt user to confirm removal
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {  
      data: {
        message: "Are you sure to remove this attendee?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // if result is true from delete confirmation dialog, remove the attendee
        this.dashBoardService.removeSelfSignupAttendee(this.itemDetail._id, attendeeId).subscribe(res => {
          // TODO: delete error notification
          this.refreshItemDetail();
        });
      }
    });
  }

  removeAdminAddedAttendee(adminAddedAttendeeObjId: string) {
    // prompt user to confirm removal
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {  
      data: {
        message: "Are you sure to remove this attendee?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // if result is true from delete confirmation dialog, remove the attendee
        this.dashBoardService.removeAdminAddedAttendee(this.itemDetail._id, adminAddedAttendeeObjId).subscribe(res => {
          // TODO: delete confirmation and delete error notification
          this.refreshItemDetail();
        });
      }
    });
  }

  adminAddingAttendee() {
    if (this.nameFC.valid && this.emailFC.valid) {
      this.dashBoardService.addAttendeeFromAdmin(this.itemDetail._id, this.newAdminAttendee).subscribe(res => {
        console.log(res);
        if (res.success) {
          this.refreshItemDetail();
          this.resetAddAttendeeForm();
        }
        // TODO: notify user if failed to add attendee
      })
    }
  }

  resetAddAttendeeForm() {
    this.newAdminAttendee = new AdminAddAttendeeModel();
    this.nameFC.reset();
    this.emailFC.reset();
    this.addAttendeeForm.nativeElement.reset();
  }

  getNameErrorMessage() {
    if (this.nameFC.hasError('required')) 
      return 'Name cannot be empty';
    else
      return '';
  }

  getEmailErrorMessage() {
    if (this.emailFC.hasError('email')) {
      return 'Email not valid';
    } else if (this.emailFC.hasError('required')) {
      return 'Email cannot be empty';
    } else {
      return '';
    }
  }

  // event handler for updating sprint review details
  onTotalSlotsUpdate() {
    if (this.itemDetailOriginal.totalSlots === this.itemDetail.totalSlots) return;

    if (this.itemDetail.totalSlots < this.itemDetail.selfSignupAttendees.length) {
      this.totalSlotsErrMsg = 'Total slots cannot be less than number of attendees signed up already';
      return;
    } 

    this.dashBoardService.updateTotalSlots(this.itemDetail._id, this.itemDetail.totalSlots).subscribe(res=>{
      if (res.success) {
        this.totalSlotsErrMsg = '';
        this.refreshItemDetail();
      } else {
        this.totalSlotsErrMsg = res.message;
      }
    });
  }

  onTitleUpdate() {
    if (this.itemDetailOriginal.title.localeCompare(this.itemDetail.title) === 0) return;

    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "title", this.itemDetail.title).subscribe(()=>{
      this.refreshItemDetail();
    });

  }
  onOrganzerUpdate() {
    if (this.itemDetailOriginal.organizer.localeCompare(this.itemDetail.organizer) === 0) return;

    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "organizer", this.itemDetail.organizer).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onStartTimeUpdate() {
    if (this.itemDetailOriginal.startTime.localeCompare(this.itemDetail.startTime) === 0) return;

    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "startTime", this.itemDetail.startTime).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onEndTimeUpdate() {
    if (this.itemDetailOriginal.endTime.localeCompare(this.itemDetail.endTime) === 0) return;

    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "endTime", this.itemDetail.endTime).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onDescriptionUpdate() {
    if (this.itemDetailOriginal.description.localeCompare(this.itemDetail.description) === 0) return;

    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "description", this.itemDetail.description).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onMeetingLinkUpdate() {
    if (this.itemDetail.meetingLink !== undefined && this.itemDetail.meetingLink.localeCompare(this.itemDetailOriginal.meetingLink)!==0 ) {
      const itemId = this.itemDetail._id;
      this.dashBoardService.updateSprintReview(itemId, "meetingLink", this.itemDetail.meetingLink).subscribe(()=>{
        this.refreshItemDetail();
      });
    }

  }

}
