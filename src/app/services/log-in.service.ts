import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, LogIn } from '../models';

@Injectable({
    providedIn: 'root'
})
export class LogInService {
    private rootUrl = environment.apiUrl;

    constructor(private _http: HttpClient) { }

    login(login: LogIn): Observable<AuthResponse> {
        return this._http.post<AuthResponse>(`${this.rootUrl}/auth/login`, login);
    }
}
