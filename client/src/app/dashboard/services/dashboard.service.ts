import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ItemDetail } from '../models/item-detail';

// import { Contact } from 

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _baseUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) { }

  
  getSprintReviews() {
    return this._http.get(this._baseUrl + '/sprintreview/getItemList').pipe(
      map(res => console.log(res))
    );
  }

  addSprintReview(newSprintReview: ItemDetail) {
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post(this._baseUrl + '/sprintreview/addItem', newSprintReview, {headers: headers}).pipe(
      map(res => console.log(res))
    )
  }

  deleteSprintReview(sprintReviewId: string) {
    return this._http.delete(this._baseUrl + '/sprintreview/deleteItem/' + sprintReviewId).pipe(
      map(res => console.log(res))
    )
  }
}
