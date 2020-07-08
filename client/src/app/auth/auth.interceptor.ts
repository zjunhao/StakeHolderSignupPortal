import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { LocalstorageTokenService } from '../log-in/services/localstorage-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private localstorageTokenService : LocalstorageTokenService,
        private router : Router
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.headers.get('NoAuth')) { // if request set NoAuth to true in header, do not attach jwt to the request
            return next.handle(req.clone());
        } else { // by default, attach jwt to the request
            const reqWithAuthorization = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.localstorageTokenService.getToken())
            });
            return next.handle(reqWithAuthorization);
            // return next.handle(reqWithAuthorization).pipe(
            //  
            //     // tap(
            //     //     event => { },
            //     //     err => {
            //     //         if (err.error.auth == false) {
            //     //             this.router.navigateByUrl('/login');
            //     //         }
            //     //     })
            // );
        }
    }
}