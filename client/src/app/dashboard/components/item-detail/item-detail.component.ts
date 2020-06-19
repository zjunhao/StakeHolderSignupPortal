import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DetailItemModel } from '../../models/detail-item-model';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  itemDetail: DetailItemModel;

  constructor(
    private dashBoardService: DashboardService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.dashBoardService.getSprintReview(id).subscribe(itemDetail => (this.itemDetail = itemDetail));
      } else {
        this.itemDetail = new DetailItemModel();
      }
    });
  }

}
