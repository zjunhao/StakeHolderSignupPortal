import { Component, OnInit } from '@angular/core';
import { DetailItemModel } from '../../models/detail-item-model';

@Component({
  selector: 'app-item-creater',
  templateUrl: './item-creater.component.html',
  styleUrls: ['./item-creater.component.scss']
})
export class ItemCreaterComponent implements OnInit {
  newItem = new DetailItemModel();

  constructor() { }

  ngOnInit(): void {
  }

  createSprintReview() {
    console.log("form submitted");
  }
}
