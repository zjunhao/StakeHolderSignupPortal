import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { FormControl, Validators } from '@angular/forms';
import { ItemCreatingModel } from '../../models/item-creating-model';

@Component({
  selector: 'app-item-creater',
  templateUrl: './item-creater.component.html',
  styleUrls: ['./item-creater.component.scss']
})
export class ItemCreaterComponent implements OnInit {
  @Output() newItemCreated: EventEmitter<string> = new EventEmitter();

  startTimeErr: string;
  endTimeErr: string;

  newItem = new ItemCreatingModel();

  // form controls
  titleFC = new FormControl('', [Validators.required]);
  descriptionFC = new FormControl('', [Validators.required]);
  organizerFC = new FormControl('', [Validators.required]);
  totalSlotFC = new FormControl('', [Validators.required, Validators.pattern('\\d+')]);

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
  }

  createSprintReview() {
    if (this.validateDateTime() && this.titleFC.valid && this.descriptionFC.valid && this.organizerFC.valid && this.totalSlotFC.valid) {
      this.dashboardService.addSprintReview(this.newItem).subscribe( res => {
        if (res.success) {
          this.newItemCreated.emit('new item created');
          this.resetForm();
          // collapse form
        }
        // TODO: maybe notify user if creating sprint review fails
      })
    }
  }

  resetForm() {
    this.newItem = new ItemCreatingModel();
  }

  /**
   * Validate Start Time and End Time, show error message if format not correct, clear error message if correct; 
   * If Start Time and End Time are all valid return true, else false.
   */
  private validateDateTime(): boolean {
    let dateTimeValid = true;

    const dateTimeRegex = RegExp('^\\d+-\\d\\d-\\d\\dT\\d\\d:\\d\\d$');

    // check start time format
    if (dateTimeRegex.test(this.newItem.startTime)) { 
      this.startTimeErr = "";
    } else {
      this.startTimeErr = "Start Time format not correct";
      dateTimeValid = false;
    }

    // check end time format
    if (dateTimeRegex.test(this.newItem.endTime)) { 
      this.endTimeErr = "";
    } else {
      this.endTimeErr = "End Time format not correct";
      dateTimeValid = false;
    }

    return dateTimeValid;
  }

  onStartTimeChange() {
    const dateTimeRegex = RegExp('^\\d+-\\d\\d-\\d\\dT\\d\\d:\\d\\d$');
    if (dateTimeRegex.test(this.newItem.startTime)) { 
      this.startTimeErr = "";
    } else {
      this.startTimeErr = "Start Time format not correct";
    }
  }

  onEndTimeChange() {
    const dateTimeRegex = RegExp('^\\d+-\\d\\d-\\d\\dT\\d\\d:\\d\\d$');
    if (dateTimeRegex.test(this.newItem.endTime)) { 
      this.endTimeErr = "";
    } else {
      this.endTimeErr = "End Time format not correct";
    }
  }

  // error messages for each form field
  getTitleErrorMessage() {
    return 'Title cannot be empty';
  }
  getDescriptionErrorMessage() {
    return 'Description cannot be empty'
  }
  getOrganizerErrorMessage() {
    return 'Organizer cannot be empty'
  }
  getTotalSlotsErrorMessage() {
    if (this.totalSlotFC.hasError('required')) {
      return 'Total slots cannot be empty';
    } else if (this.totalSlotFC.hasError('pattern')){
      return 'Slots should be a number';
    } else {
      return '';
    }
  }
}
