import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { ListItemModel, ApiListItemModel } from '../models/item-list-response-model';
import { ApiDetailItemModel, DetailItemModel } from '../models/item-detail-response-model';
import { ItemCreatingModel } from '../models/item-creating-model';
import { SuccessMessageResponseModel } from 'src/app/shared/models/success-message-response-model';
import { AdminAddAttendeeModel } from '../models/admin-add-attendee-model';
import { DatetimeFormattingService } from './datetime-formatting.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private dateTimeFormattingService: DatetimeFormattingService
  ) { }

  // get a list of sprint review
  getSprintReviewList(): Observable<ListItemModel[]> {
    const url = `${this.baseUrl}/sprintreview/getItemList`;

    return this.http
      .get<ApiListItemModel[]>(url)
      .pipe(
        // tap(listItems => console.log(listItems)),
        map(listItems => this.toClientListItems(listItems)), 
        tap(listItems => console.log(listItems)),
        catchError(this.handleError)
      );
  }

  // get all details about a specific sprint review
  getSprintReview(id: string): Observable<DetailItemModel> {
    const url = `${this.baseUrl}/sprintreview/getItem/${id}`;

    return this.http
      .get<ApiDetailItemModel>(url)
      .pipe(
        map(apiItemDetail => this.toClientItemDetail(apiItemDetail)),
        catchError(this.handleError)
      );
  }

  // add new sprint review
  addSprintReview(newSprintReviewRaw: ItemCreatingModel): Observable<SuccessMessageResponseModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/sprintreview/addItem`;

    const newSprintReview = {
      title: newSprintReviewRaw.title,
      totalSlots: newSprintReviewRaw.totalSlots,
      organizer: newSprintReviewRaw.organizer,
      startTime: this.dateTimeFormattingService.toUNIXTimestamp(newSprintReviewRaw.startTime),
      endTime: this.dateTimeFormattingService.toUNIXTimestamp(newSprintReviewRaw.endTime),
      description: newSprintReviewRaw.description,
      meetingLink: newSprintReviewRaw.meetingLink
    }

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
    if (fieldName.localeCompare('startTime')===0 || fieldName.localeCompare('endTime')===0) {
      reqBody[fieldName] = this.dateTimeFormattingService.toUNIXTimestamp(fieldValue);
    } else {
      reqBody[fieldName] = fieldValue;
    }

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
    return this.http
      .put<SuccessMessageResponseModel>(url, reqBody)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

  private toClientListItems(apiItems: ApiListItemModel[]): ListItemModel[] {
    let items: ListItemModel[] = [];
    apiItems.forEach(apiItem => {
      console.log(apiItem);
      let item = {
        _id: apiItem._id,
        title: apiItem.title,
        startTime: this.dateTimeFormattingService.toLocalDateTimeString(apiItem.startTime),
        endTime: this.dateTimeFormattingService.toLocalDateTimeString(apiItem.endTime),
        remainingSlots: apiItem.remainingSlots,
        description: apiItem.description,
        organizer: apiItem.organizer
      } as ListItemModel;
      items.push(item);
    })
    return items;
  }

  private toClientItemDetail(apiItem: ApiDetailItemModel): DetailItemModel {
    return {
      _id: apiItem._id,
      title: apiItem.title,
      totalSlots: apiItem.totalSlots,
      organizer: apiItem.organizer,
      startTime: this.dateTimeFormattingService.toLocalDateTimeString(apiItem.startTime),
      endTime: this.dateTimeFormattingService.toLocalDateTimeString(apiItem.endTime),
      description: apiItem.description,
      selfSignupAttendees: apiItem.selfSignupAttendees,
      administratorAddedAttendees: apiItem.administratorAddedAttendees,
      meetingLink: apiItem.meetingLink, 
    } as DetailItemModel;
  }
}
