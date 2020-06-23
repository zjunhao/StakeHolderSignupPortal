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

  editMode: boolean = true;
  itemDetail: DetailItemModel = new DetailItemModel();

  constructor(
    private dashBoardService: DashboardService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.refreshItemDetail();
  }

  refreshItemDetail() {
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
