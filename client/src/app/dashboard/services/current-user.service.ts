import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/shared/models/user-model';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  constructor() { }

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

  private getCurrentUserFromLocalStorage(): UserModel {
    const jsonStr = localStorage.getItem('currentUser');
    return JSON.parse(jsonStr) as UserModel;
  }
}
