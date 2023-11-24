import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account } from '../models/account.model';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    private rootUrl = environment.apiUrl;

    constructor(private _http: HttpClient) { }

    createAccount(account: Account): Observable<HttpResponse<Account>> {
        return this._http.post<Account>(`${this.rootUrl}/account/create-account`, account, {observe:"response"});
    }

    getAccountByIdentification(identification: string): Observable<Account[]> {
        return this._http.get<Account[]>(`${this.rootUrl}/account/get-account-identification/${identification}`);
    }
}
