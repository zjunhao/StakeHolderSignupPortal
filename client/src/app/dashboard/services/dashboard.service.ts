import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { ItemListResponseModel } from '../models/item-list-response-model';
import { ItemDetailResponseModel } from '../models/item-detail-response-model';
import { ItemCreatingModel } from '../models/item-creating-model';
import { SuccessMessageResponseModel } from 'src/app/shared/models/success-message-response-model';
import { AdminAddAttendeeModel } from '../models/admin-add-attendee-model';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  // get a list of sprint review
  getSprintReviewList(): Observable<ItemListResponseModel> {
    const url = `${this.baseUrl}/sprintreview/getItemList`;

    return this.http
      .get<ItemListResponseModel>(url)
      .pipe(catchError(this.handleError));
  }

  // get all details about a specific sprint review
  getSprintReview(id: string): Observable<ItemDetailResponseModel> {
    const url = `${this.baseUrl}/sprintreview/getItem/${id}`;

    return this.http
      .get<ItemDetailResponseModel>(url)
      .pipe(catchError(this.handleError));
  }

  // add new sprint review
  addSprintReview(newSprintReview: ItemCreatingModel): Observable<SuccessMessageResponseModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/sprintreview/addItem`;

    return this.http
      .post<SuccessMessageResponseModel>(url, newSprintReview, {headers: headers})
      .pipe(catchError(this.handleError));
  }

  // delete a specific sprint review
  deleteSprintReview(id: string): Observable<SuccessMessageResponseModel> {
    const url = `${this.baseUrl}/sprintreview/deleteItem/${id}`;

    return this.http
      .delete<SuccessMessageResponseModel>(url)
      .pipe(catchError(this.handleError));
  }

  // update field of a sprint review
  updateSprintReview(id: string, fieldName: string, fieldValue: string): Observable<SuccessMessageResponseModel>{
    const url = `${this.baseUrl}/sprintreview/updateItem/${id}`;
    
    let reqBody = {};
    reqBody[fieldName] = fieldValue;

    return this.http
      .put<SuccessMessageResponseModel>(url, reqBody)
      .pipe(catchError(this.handleError));
  }

  // update total slots field of a sprint review
  // this get handled separately from other fields update becuase there's more check backend for updating total slots
  updateTotalSlots(id: string, newSlots: number): Observable<SuccessMessageResponseModel>{
    const url = `${this.baseUrl}/sprintreview/updateTotalSlots/${id}`;

    const reqBody = { totalSlots: newSlots };

    return this.http
      .put<SuccessMessageResponseModel>(url, reqBody)
      .pipe(catchError(this.handleError));
  }

  // user try to sign up for sprint review
  attendeeSignUp(sprintReviewId: string, userId: string): Observable<SuccessMessageResponseModel> {
    const url = `${this.baseUrl}/sprintreview/attendeeSignup/${sprintReviewId}`;
    
    const reqBody = { userId: userId };

    return this.http
      .put<SuccessMessageResponseModel>(url, reqBody)
      .pipe(catchError(this.handleError));
  }

  // User unregister to the sprint review
  attendeeUnregister(sprintReviewId: string, userId: string): Observable<SuccessMessageResponseModel> {
    const url = `${this.baseUrl}/sprintreview/attendeeUnregister/${sprintReviewId}`;
    
    const reqBody = { userId: userId };

    return this.http
      .put<SuccessMessageResponseModel>(url, reqBody)
      .pipe(catchError(this.handleError));
  }

  // Admin remove self signed up user from sprint review attendee list
  removeSelfSignupAttendee(sprintReviewId: string, userId: string): Observable<SuccessMessageResponseModel> {
    const url = `${this.baseUrl}/sprintreview/removeSelfSignupAttendee/${sprintReviewId}`;
    
    const reqBody = { userId: userId };

    return this.http
      .put<SuccessMessageResponseModel>(url, reqBody)
      .pipe(catchError(this.handleError));
  }

  // Admin remove user added by himself/herself from sprint review attendee list
  removeAdminAddedAttendee(sprintReviewId: string, adminAddedAttendeeObjId: string): Observable<SuccessMessageResponseModel> {
    const url = `${this.baseUrl}/sprintreview/removeAdminAddedAttendee/${sprintReviewId}`;
    
    const reqBody = { attendeeObjId: adminAddedAttendeeObjId };

    return this.http
      .put<SuccessMessageResponseModel>(url, reqBody)
      .pipe(catchError(this.handleError));
  }

  // Admin add attendee to a sprint review
  addAttendeeFromAdmin(sprintReviewId: string, attendeeInfo: AdminAddAttendeeModel): Observable<SuccessMessageResponseModel> {
    const url = `${this.baseUrl}/sprintreview/adminAddAttendee/${sprintReviewId}`;
    
    const reqBody = { newAttendee: attendeeInfo };
    console.log(reqBody);
    return this.http
      .put<SuccessMessageResponseModel>(url, reqBody)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
