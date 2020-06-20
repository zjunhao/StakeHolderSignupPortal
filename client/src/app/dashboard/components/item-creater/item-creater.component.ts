import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DetailItemModel } from '../../models/detail-item-model';
import { DashboardService } from '../../services/dashboard.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-creater',
  templateUrl: './item-creater.component.html',
  styleUrls: ['./item-creater.component.scss']
})
export class ItemCreaterComponent implements OnInit {
  @Output() newItemCreated: EventEmitter<string> = new EventEmitter();

  newItem = new DetailItemModel();

  // form controls
  titleFC = new FormControl('', [Validators.required, Validators.minLength(1)]);
  descriptionFC = new FormControl('', [Validators.required, Validators.minLength(1)]);
  organizerFC = new FormControl('', [Validators.required, Validators.minLength(1)]);
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
      console.log('saved success');
      // this.dashboardService.addSprintReview(this.newItem).subscribe( () =>{
      //   this.newItemCreated.emit('new item created');
      // })
    }
  }

  getErrorMessage() {
    // console.log('called');
    // if (this.email.hasError('required')) {
    //   return 'You must enter a value';
    // }

    // return this.email.hasError('email') ? 'Not a valid email' : '';
    return 'Field cannot be empty'
  }
}
