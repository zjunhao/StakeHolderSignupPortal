import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  newItem = new ItemCreatingModel();

  // form controls
  titleFC = new FormControl('', [Validators.required]);
  descriptionFC = new FormControl('', [Validators.required]);
  organizerFC = new FormControl('', [Validators.required]);
  totalSlotFC = new FormControl('', [Validators.required, Validators.pattern('\\d+')]);
  startTimeFC = new FormControl('', [Validators.required, Validators.pattern('\\d+-\\d\\d-\\d\\dT\\d\\d:\\d\\d')]);
  endTimeFC = new FormControl('', [Validators.required, Validators.pattern('\\d+-\\d\\d-\\d\\dT\\d\\d:\\d\\d')]);

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
  }

  createSprintReview() {
    if (this.titleFC.valid && this.descriptionFC.valid && this.organizerFC.valid 
          && this.totalSlotFC.valid && this.startTimeFC.valid && this.endTimeFC.valid) {
      this.dashboardService.addSprintReview(this.newItem).subscribe( res => {
        if (res.success) {
          this.newItemCreated.emit('new item created');
          // clear form fields
          // collapse form
        }
        // TODO: maybe notify user if creating sprint review fails
      })
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
  getStartTimeErrorMessage() {
    if (this.startTimeFC.hasError('required')) {
      return 'Start time cannot be empty';
    } else if (this.startTimeFC.hasError('pattern')){
      return 'Date time format not correct';
    } else {
      return '';
    }
  }
  getEndTimeErrorMessage() {
    if (this.endTimeFC.hasError('required')) {
      return 'End time cannot be empty';
    } else if (this.endTimeFC.hasError('pattern')){
      return 'Date time format not correct';
    } else {
      return '';
    }
  }
}
