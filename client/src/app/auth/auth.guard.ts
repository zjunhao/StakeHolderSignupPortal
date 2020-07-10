import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../log-in/services/user.service';
import { LocalstorageTokenService } from '../log-in/services/localstorage-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private localstorageTokenService: LocalstorageTokenService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    if (this.localstorageTokenService.getToken() && this.localstorageTokenService.isTokenValid()) {  // token exists in local storage and not expired
      return true;
    } else {
      this.localstorageTokenService.removeToken();
      alert('Jwt token is invalid, try re-login to the app.');
      this.router.navigateByUrl('/login');
      return false;
    }
  }
  
}
