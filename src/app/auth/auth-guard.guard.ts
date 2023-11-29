import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
    
    constructor(public authService: AuthService, public router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthenticated) {
            return true;
        } else {
            this.router.navigate(['/auth/login']);
            return false;
        }
    }

}
