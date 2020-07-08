import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { SignupModel } from '../models/signup-model';
import { LoginModel } from '../models/login-model';
import { SuccessMessageResponseModel } from 'src/app/shared/models/success-message-response-model';
import { LoginResponseModel } from '../models/login-response-model';
import { Router } from '@angular/router';
import { UserPrivilegeEnum } from '../enums/user-privilege-enum';
import { LocalstorageTokenService } from './localstorage-token.service';
import { GetCurrentUserInfoResponseModel } from '../models/get-current-user-response-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private localstorageTokenService: LocalstorageTokenService,
    private router: Router
  ) { }

  signupUser(newUser: SignupModel): Observable<SuccessMessageResponseModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('NoAuth', 'True');

    const url = `${this.baseUrl}/user/createUser`;

    // TODO: hash passwords here

    return this.http
      .post<SuccessMessageResponseModel>(url, newUser, {headers: headers})
      .pipe(catchError(this.handleError));
  }

  loginUser(user: LoginModel): Observable<LoginResponseModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('NoAuth', 'True');

    const url = `${this.baseUrl}/user/loginUser`;

    return this.http
      .post<LoginResponseModel>(url, user, {headers: headers})
      .pipe(catchError(this.handleError));
  }

  /** Log user out by removing localStorage and navigate user to login page */
  logOutUser() {
    this.localstorageTokenService.removeToken();
    this.router.navigate(['/login']);
  }

  /**
   * Get user info about user signed in,
   * We didn't provide an id here, since it is extracted from jwt token.
   */
  getCurrentUserInfo(): Observable<GetCurrentUserInfoResponseModel> {
    const url = `${this.baseUrl}/user/getCurrentUserInfo`;

    return this.http
      .get<GetCurrentUserInfoResponseModel>(url)
      .pipe(catchError(this.handleError));
  }

  /** Promote user account to be administrator */
  promoteUser(id: string, passcode: string) {
    const url = `${this.baseUrl}/user/promoteUser/${id}`;
    
    const reqBody = {passcode: passcode};

    return this.http
      .put<SuccessMessageResponseModel>(url, reqBody)
      .pipe(catchError(this.handleError));
  }

  /** Remove user's administrator privilege */
  removeUserAdmin(id: string) {
    const url = `${this.baseUrl}/user/removeUserAdmin/${id}`;
    
    const reqBody = {privilege: "normal"};

    return this.http
      .put<SuccessMessageResponseModel>(url, reqBody)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
