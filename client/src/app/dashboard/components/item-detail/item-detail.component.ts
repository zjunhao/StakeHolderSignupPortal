import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DetailItemModel } from '../../models/detail-item-model';
import { CurrentUserService } from '../../services/current-user.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  editMode: boolean = false;
  itemDetail: DetailItemModel = new DetailItemModel();
  signupResultMessage: string = '';

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

    // extract editMode bool from request query parameter 
    this.route.queryParams.forEach((params: Params) => {
      if (params['editMode'] !== undefined) {
        this.editMode = params['editMode'] === 'true';
      }
    })
  }

  //-----------------------for normal user-----------------------------------------
  attendeeSignUp() {
    this.dashBoardService.attendeeSignUp(this.itemDetail._id, this.currentUserService.getId()).subscribe(res => {
      if (res.message) {
        this.signupResultMessage = res.message;
      }
    });
  }

  //-----------------------for administrator---------------------------------------
  onTitleUpdate() {
    const updateId = this.itemDetail._id;
    const updateBody = {"title" : this.itemDetail.title};
    this.dashBoardService.updateSprintReview(updateId, updateBody).subscribe(()=>{
      this.refreshItemDetail();
    });

  }
  onOrganzerUpdate() {
    const updateId = this.itemDetail._id;
    const updateBody = {"organizer" : this.itemDetail.organizer};
    this.dashBoardService.updateSprintReview(updateId, updateBody).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onStartTimeUpdate() {
    const updateId = this.itemDetail._id;
    const updateBody = {"startTime" : this.itemDetail.startTime};
    this.dashBoardService.updateSprintReview(updateId, updateBody).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onEndTimeUpdate() {
    const updateId = this.itemDetail._id;
    const updateBody = {"endTime" : this.itemDetail.endTime};
    this.dashBoardService.updateSprintReview(updateId, updateBody).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onDescriptionUpdate() {
    const updateId = this.itemDetail._id;
    const updateBody = {"description" : this.itemDetail.description};
    this.dashBoardService.updateSprintReview(updateId, updateBody).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onMeetingLinkUpdate() {
    const updateId = this.itemDetail._id;
    const updateBody = {"meetingLink" : this.itemDetail.meetingLink};
    this.dashBoardService.updateSprintReview(updateId, updateBody).subscribe(()=>{
      this.refreshItemDetail();
    });
  }

}
