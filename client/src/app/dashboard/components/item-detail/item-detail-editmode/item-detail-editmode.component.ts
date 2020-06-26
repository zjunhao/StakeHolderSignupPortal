import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { DetailItemModel } from 'src/app/dashboard/models/item-detail-response-model';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';

@Component({
  selector: 'app-item-detail-editmode',
  templateUrl: './item-detail-editmode.component.html',
  styleUrls: ['./item-detail-editmode.component.scss']
})
export class ItemDetailEditmodeComponent implements OnInit {
  itemDetail: DetailItemModel = new DetailItemModel();

  constructor(
    private dashBoardService: DashboardService,
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
          if(res.success) {
            this.itemDetail = res.itemDetail;
          }
          // TODO: notice user when get item detail fails
        });
      } 
    });
  }

  // event handler for save form fileds
  onTitleUpdate() {
    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "title", this.itemDetail.title).subscribe(()=>{
      this.refreshItemDetail();
    });

  }
  onOrganzerUpdate() {
    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "organizer", this.itemDetail.organizer).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onStartTimeUpdate() {
    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "startTime", this.itemDetail.startTime).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onEndTimeUpdate() {
    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "endTime", this.itemDetail.endTime).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onDescriptionUpdate() {
    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "description", this.itemDetail.description).subscribe(()=>{
      this.refreshItemDetail();
    });
  }
  onMeetingLinkUpdate() {
    const itemId = this.itemDetail._id;
    this.dashBoardService.updateSprintReview(itemId, "meetingLink", this.itemDetail.meetingLink).subscribe(()=>{
      this.refreshItemDetail();
    });
  }

}
