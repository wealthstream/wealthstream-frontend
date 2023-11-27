import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { Customer } from '../models';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    private rootUrl = environment.apiUrl;

    constructor(private _http: HttpClient) { }

    getcustomerByIdentification(identification:string):Observable<Customer> {
        return this._http.get<Customer>(`${this.rootUrl}/customer/get-customer/${identification}`)
    }

    updateCustomer(customer: Customer): Observable <Customer> {
        return this._http.patch<Customer>(`${this.rootUrl}/customer/update-customer`, customer);
    };

    createCustomer(customer: Customer): Observable<HttpResponse<Customer>> {
        return this._http.post<Customer>(`${this.rootUrl}/customer/create-customer`, customer, {observe:"response"});
    }
}