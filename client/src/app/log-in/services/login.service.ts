import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { SignupModel } from '../models/signup-model';
import { LoginModel } from '../models/login-model';
import { ServerUserModel } from '../models/user-model-server';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient
  ) { }

  signupUser(newUser: SignupModel) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/user/createUser`;

    // TODO: hash passwords here

    return this.http
      .post(url, newUser, {headers: headers})
      .pipe(catchError(this.handleError));
  }

  loginUser(user: LoginModel) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const url = `${this.baseUrl}/user/loginUser`;

    return this.http
      .post<ServerUserModel>(url, user, {headers: headers})
      .pipe(
        map(serverUserModel => {
          if (serverUserModel.success) {
            return this.toClientUserModel(serverUserModel);
          } else {
            return null;
          }
        }), 
        catchError(this.handleError));
  }

  private toClientUserModel(serverModel: ServerUserModel): UserModel {
    return {
      _id: serverModel.userInfo._id,
      email: serverModel.userInfo.email,
      name: serverModel.userInfo.name,
      privilege: serverModel.userInfo.privilege
    } as UserModel;
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
