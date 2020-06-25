import { Component, OnInit } from '@angular/core';
import { DetailItemModel } from 'src/app/dashboard/models/detail-item-model';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { CurrentUserService } from 'src/app/dashboard/services/current-user.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-item-detail-noneditmode',
  templateUrl: './item-detail-noneditmode.component.html',
  styleUrls: ['./item-detail-noneditmode.component.scss']
})
export class ItemDetailNoneditmodeComponent implements OnInit {

  itemDetail: DetailItemModel = new DetailItemModel();
  signupResultMessage: string = '';
  unregisterResultMessage: string = '';
  userSignedUp: boolean;

  constructor(
    private dashBoardService: DashboardService,
    private currentUserService: CurrentUserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.refreshItemDetail();
  }

  refreshItemDetail() {
    // request example like .../:id/?editMode=false
    // extract item id from request parameter
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = params['id'];
        this.dashBoardService.getSprintReview(id).subscribe(itemDetail => {
          this.itemDetail = itemDetail;
        });
      } 
    });
  }

  attendeeSignUp() {
    this.dashBoardService.attendeeSignUp(this.itemDetail._id, this.currentUserService.getId()).subscribe(res => {
      if (res.message) {
        this.signupResultMessage = res.message;
      }
    });
  }

  attendeeUnregister() {
    this.dashBoardService.attendeeUnregister(this.itemDetail._id, this.currentUserService.getId()).subscribe(res => {
      if (res.message) {
        this.unregisterResultMessage = res.message;
      }
    });
  }

}
