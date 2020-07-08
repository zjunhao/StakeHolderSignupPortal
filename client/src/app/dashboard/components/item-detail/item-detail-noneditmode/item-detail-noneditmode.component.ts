import { Component, OnInit } from '@angular/core';
import { DetailItemModel } from 'src/app/dashboard/models/item-detail-response-model';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CurrentUserModel } from 'src/app/log-in/models/get-current-user-response-model';
import { UserService } from 'src/app/log-in/services/user.service';

@Component({
  selector: 'app-item-detail-noneditmode',
  templateUrl: './item-detail-noneditmode.component.html',
  styleUrls: ['./item-detail-noneditmode.component.scss']
})
export class ItemDetailNoneditmodeComponent implements OnInit {

  itemDetail: DetailItemModel = new DetailItemModel();
  currentUser: CurrentUserModel = new CurrentUserModel();

  userSignedUp: boolean;

  signupResultMessage: string = '';
  unregisterResultMessage: string = '';


  constructor(
    private dashBoardService: DashboardService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUserInfo().subscribe(res => {
      if (res.success) {
        this.currentUser = res.user;
        this.refreshItemDetail();
      } else {
        console.error('Fail to load current user information');
      }
    })
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
          } else {
            console.error('Fail to load sprint review detail');
          }
        });
      } 
    });
  }

  attendeeSignUp() {
    this.dashBoardService.attendeeSignUp(this.itemDetail._id, this.currentUser._id).subscribe(res => {
      alert(res.message);
      this.refreshItemDetail();
    });
  }

  attendeeUnregister() {
    this.dashBoardService.attendeeUnregister(this.itemDetail._id, this.currentUser._id).subscribe(res => {
      alert(res.message);
      this.refreshItemDetail();
    });
  }

  // determine whether current user has signed up
  private currentUserSignedUp(): boolean {
    const currentUserId = this.currentUser._id;
    const signedUpUsers = this.itemDetail.selfSignupAttendees;
    for (var i = 0; i < signedUpUsers.length; i++) {
      if (signedUpUsers[i]._id.localeCompare(currentUserId) === 0){
        return true;
      };
    }
    return false;
  }
}
