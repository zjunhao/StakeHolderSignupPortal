import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  editMode: boolean = false;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // extract editMode bool from request query parameter 
    this.route.queryParams.forEach((params: Params) => {
      if (params['editMode'] !== undefined) {
        this.editMode = params['editMode'] === 'true';
      }
      // this.editMode=true;
    })
  }
}
