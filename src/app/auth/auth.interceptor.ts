import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import { from, lastValueFrom } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return from(this.handle(req, next))
    }

    async handle(req: HttpRequest<any>, next: HttpHandler) {
        let token = localStorage.getItem('token');

        const authReq = req.clone({
            setHeaders: {
                Authorization: "Bearer " + token,
            }
        });
        return await lastValueFrom(next.handle(authReq));
    }
}
