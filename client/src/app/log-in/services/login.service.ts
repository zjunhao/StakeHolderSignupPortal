import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { SignupModel } from '../models/signup-model';
import { LoginModel } from '../models/login-model';
import { SuccessMessageResponseModel } from 'src/app/shared/models/success-message-response-model';
import { LoginResponseModel } from '../models/login-response-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  signupUser(newUser: SignupModel): Observable<SuccessMessageResponseModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/user/createUser`;

    // TODO: hash passwords here

    return this.http
      .post<SuccessMessageResponseModel>(url, newUser, {headers: headers})
      .pipe(catchError(this.handleError));
  }

  loginUser(user: LoginModel): Observable<LoginResponseModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/user/loginUser`;

    return this.http
      .post<LoginResponseModel>(url, user, {headers: headers})
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
