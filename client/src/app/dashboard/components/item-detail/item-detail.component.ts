import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  constructor(
    private _dashBoardService: DashboardService
  ) { }

  ngOnInit(): void {
    this._dashBoardService.getSprintReviews().subscribe();
  }

}
