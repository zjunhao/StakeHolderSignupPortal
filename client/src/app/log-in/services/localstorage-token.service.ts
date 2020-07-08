import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageTokenService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  isTokenValid(): boolean {
    var tokenPayload = this.getPayloadFromToken();
    if (tokenPayload) {
      return tokenPayload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  
  // getLoggedInUserIdFromToken(): string {
  //   var payload = this.getPayloadFromToken();
  //   if (payload) {
  //     return payload._id;
  //   } else {
  //     return null;
  //   }
  // }

  // extract payload section from json web token, return null if failed.
  private getPayloadFromToken() {
    var token = this.getToken();
    if (token) {
      // token: header.payload.signature
      var tokenPayload = atob(token.split('.')[1]);
      return JSON.parse(tokenPayload);
    } else {
      return null;
    }
  }
}
