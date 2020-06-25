import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';

import { DetailItemModel } from '../models/detail-item-model';
import { ListItemModel } from '../models/list-item-model';
import { ServerDetailItemModel } from '../models/detail-item-model-server';
import { ServerListItemModel } from '../models/list-item-model-server';
import { ServerSuccessMessageModel } from '../models/success-message-model-server';
import { ServerAttendeeModel } from '../models/attendee-model-server';
import { AttendeeModel } from '../models/attendee-model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  // get a list of sprint review
  getSprintReviewList() {
    const url = `${this.baseUrl}/sprintreview/getItemList`;

    return this.http
      .get<ServerListItemModel[]>(url)
      .pipe(map(serverListItems => this.toClientListItems(serverListItems)), catchError(this.handleError));
  }

  // get all details about a specific sprint review
  getSprintReview(id: string): Observable<DetailItemModel> {
    const url = `${this.baseUrl}/sprintreview/getItem/${id}`;

    return this.http
      .get<ServerDetailItemModel>(url)
      .pipe(map(serverDetailItem => this.toClientDetailItem(serverDetailItem)), catchError(this.handleError));
  }

  // add new sprint review
  addSprintReview(newSprintReview: DetailItemModel) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/sprintreview/addItem`;

    return this.http
      .post<DetailItemModel>(url, newSprintReview, {headers: headers})
      .pipe(catchError(this.handleError));
  }

  // delete a specific sprint review
  deleteSprintReview(id: string) {
    const url = `${this.baseUrl}/sprintreview/deleteItem/${id}`;

    return this.http
      .delete(url)
      .pipe(catchError(this.handleError));
  }

  // update field of a sprint review
  updateSprintReview(id: string, updateBody: object){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/sprintreview/updateItem/${id}`;
    
    return this.http
      .put(url, updateBody)
      .pipe(catchError(this.handleError));
  }

  // user try to sign up for sprint review
  attendeeSignUp(sprintReviewId: string, userId: string) {
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/sprintreview/attendeeSignup/${sprintReviewId}`;
    
    const userInfo = { userId: userId };

    return this.http
      .put<ServerSuccessMessageModel>(url, userInfo)
      .pipe(catchError(this.handleError));
  }

  attendeeUnregister(sprintReviewId: string, userId: string) {
    const url = `${this.baseUrl}/sprintreview/attendeeUnregister/${sprintReviewId}`;
    
    const userInfo = { userId: userId };

    return this.http
      .put<ServerSuccessMessageModel>(url, userInfo)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

  private toClientDetailItem(serverDetailItem: ServerDetailItemModel): DetailItemModel {
    const selfSignupAttendeesClientFormat = this.toClientSelfSignupAttendees(serverDetailItem.self_signup_attendees);
    return {
      _id: serverDetailItem._id,
      title: serverDetailItem.title,
      totalSlots: serverDetailItem.total_slots,
      organizer: serverDetailItem.event_organizer,
      startTime: serverDetailItem.start_time,
      endTime: serverDetailItem.end_time,
      description: serverDetailItem.short_description,
      selfSignupAttendees: selfSignupAttendeesClientFormat,
      administratorAddedAttendees: serverDetailItem.administrator_added_attendees,
      meetingLink: serverDetailItem.meeting_link, 
    } as DetailItemModel;
  }
  private toClientSelfSignupAttendees(attendeesArrServer:ServerAttendeeModel[]): AttendeeModel[] {
    let attendeesArr: AttendeeModel[] = [];

    attendeesArrServer.forEach(attendeeServer => {
      const attendeeClient = {
        _id: attendeeServer._id,
        name: attendeeServer.name,
        email: attendeeServer.email,
        privilege: attendeeServer.privilege 
      } as AttendeeModel;
      attendeesArr.push(attendeeClient);
    });

    return attendeesArr;
  }

  private toClientListItems(serverListItems: ServerListItemModel[]): ListItemModel[] {
    return serverListItems.map(serverListItem => {
      return {
        _id: serverListItem._id,
        title: serverListItem.title,
        startTime: serverListItem.start_time,
        endTime: serverListItem.end_time,
        description: serverListItem.short_description,
      } as ListItemModel;
    });
  }
}
