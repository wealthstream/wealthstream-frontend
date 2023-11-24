import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AccountMovement, Transfer } from '../models';

@Injectable({
    providedIn: 'root'
})
export class AccountMovementService {
    private rootUrl = environment.apiUrl;

    constructor(private _http: HttpClient) { }

    makeDeposit(deposit: AccountMovement): Observable<HttpResponse<AccountMovement>> {
        return this._http.post<AccountMovement>(`${this.rootUrl}/account-movement/movement/deposit`, deposit, {observe: "response"});
    }

    makeWithdrawal(withdrawal: AccountMovement): Observable<HttpResponse<AccountMovement>> {
        return this._http.post<AccountMovement>(`${this.rootUrl}/account-movement/movement/withdrawal`, withdrawal, {observe: "response"});
    }

    makeTransfer(transfer: Transfer): Observable<HttpResponse<AccountMovement>> {
        return this._http.post<AccountMovement>(`${this.rootUrl}/account-movement/movement/transfer`, transfer, {observe: "response"});
    }

    getMovementsByIdentification(identification: string): Observable<AccountMovement[]> {
        return this._http.get<AccountMovement[]>(`${this.rootUrl}/account-movement/movement/get-movements-identification/${identification}`);
    }
}
