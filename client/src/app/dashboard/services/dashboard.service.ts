import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';

import { DetailItemModel } from '../models/detail-item-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private _http: HttpClient) { }

  // get a list of sprint review
  getSprintReviewList() {
    const url = `${this.baseUrl}/sprintreview/getItemList`;

    return this._http
      .get<DetailItemModel[]>(url)
      .pipe(map(data => data), catchError(this.handleError));
  }

  // get all details about a specific sprint review
  getSprintReview(id: string) {
    const url = `${this.baseUrl}/sprintreview/getItem/${id}`;

    return this._http
      .get<DetailItemModel>(url)
      .pipe(map(data => data), catchError(this.handleError));
  }

  // add new sprint review
  addSprintReview(newSprintReview: DetailItemModel) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/sprintreview/addItem`;

    return this._http
      .post<DetailItemModel>(url, newSprintReview, {headers: headers})
      .pipe(catchError(this.handleError));
  }

  // delete a specific sprint review
  deleteSprintReview(sprintReviewId: string) {
    const url = `${this.baseUrl}/sprintreview/deleteItem/${sprintReviewId}`;

    return this._http
      .delete<DetailItemModel>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
