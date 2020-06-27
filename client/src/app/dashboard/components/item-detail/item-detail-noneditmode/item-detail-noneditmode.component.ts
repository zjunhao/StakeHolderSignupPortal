import { Component, OnInit } from '@angular/core';
import { DetailItemModel } from 'src/app/dashboard/models/item-detail-response-model';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { CurrentUserInfoService } from 'src/app/log-in/services/current-user-info.service';
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
    private currentUserService: CurrentUserInfoService,
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
        this.dashBoardService.getSprintReview(id).subscribe(res => {
          if (res.success) {
            this.itemDetail = res.itemDetail;
            this.userSignedUp = this.currentUserSignedUp();
          }
          //TODO: Notice user when fail to get item detail
        });
      } 
    });
  }

  attendeeSignUp() {
    this.dashBoardService.attendeeSignUp(this.itemDetail._id, this.currentUserService.getId()).subscribe(res => {
      alert(res.message);
      this.refreshItemDetail();
    });
  }

  attendeeUnregister() {
    this.dashBoardService.attendeeUnregister(this.itemDetail._id, this.currentUserService.getId()).subscribe(res => {
      alert(res.message);
      this.refreshItemDetail();
    });
  }

  // determine whether current user has signed up
  private currentUserSignedUp(): boolean {
    const currentUserId = this.currentUserService.getId();
    const signedUpUsers = this.itemDetail.selfSignupAttendees;
    for (var i = 0; i < signedUpUsers.length; i++) {
      if (signedUpUsers[i]._id.localeCompare(currentUserId) === 0){
        return true;
      };
    }
    return false;
  }
}
