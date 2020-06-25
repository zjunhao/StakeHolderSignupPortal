import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { DetailItemModel } from 'src/app/dashboard/models/detail-item-model';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';
import { CurrentUserService } from 'src/app/dashboard/services/current-user.service';

@Component({
  selector: 'app-item-detail-editmode',
  templateUrl: './item-detail-editmode.component.html',
  styleUrls: ['./item-detail-editmode.component.scss']
})
export class ItemDetailEditmodeComponent implements OnInit {
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
  }

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
