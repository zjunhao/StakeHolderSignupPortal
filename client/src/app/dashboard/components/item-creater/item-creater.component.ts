import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { FormControl, Validators, NgForm } from '@angular/forms';
import { ItemCreatingModel } from '../../models/item-creating-model';

@Component({
  selector: 'app-item-creater',
  templateUrl: './item-creater.component.html',
  styleUrls: ['./item-creater.component.scss']
})
export class ItemCreaterComponent implements OnInit {
  @Output() newItemCreated: EventEmitter<string> = new EventEmitter();

  @ViewChild('creationForm') creationForm: ElementRef;

  /** 
   * Returns true only when submit button is clicked but form is not submitted due to invalid form data,
   * return false in all other scenarios.
   **/
  formSubmitted: boolean = false;

  newItem = new ItemCreatingModel();

  // form controls
  titleFC = new FormControl('', [Validators.required]);
  shortDescriptionFC = new FormControl('', [Validators.required]);
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
    this.formSubmitted = true;

    if (this.titleFC.valid && this.shortDescriptionFC.valid && this.organizerFC.valid 
      && this.totalSlotFC.valid &&this.startTimeFC.valid && this.endTimeFC.valid ) {
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
    this.formSubmitted = false;

    this.titleFC.reset();
    this.shortDescriptionFC.reset();  
    this.organizerFC.reset();  
    this.totalSlotFC.reset();  
    this.startTimeFC.reset();  
    this.endTimeFC.reset();  
  
    this.creationForm.nativeElement.reset();
  }

  //-------------------- error messages for each form field -----------------------------
  getTitleErrorMessage() {
    return 'Title cannot be empty';
  }
  getShortDescriptionErrorMessage() {
    return 'Short description cannot be empty'
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
