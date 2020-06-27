import { Injectable } from '@angular/core';
import { CurrentUserModel } from '../models/current-user-model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserInfoService {

  constructor() { }

  getId(): string {
    const currUser = this.getCurrentUserFromLocalStorage();
    return currUser._id;
  }

  getEmail(): string {
    const currUser = this.getCurrentUserFromLocalStorage();
    return currUser.email;
  }

  getName(): string {
    const currUser = this.getCurrentUserFromLocalStorage();
    return currUser.name;
  }

  getPrivilege(): string {
    const currUser = this.getCurrentUserFromLocalStorage();
    return currUser.privilege;
  }

  private getCurrentUserFromLocalStorage(): CurrentUserModel {
    const jsonStr = localStorage.getItem('currentUser');
    return JSON.parse(jsonStr) as CurrentUserModel;
  }
}
