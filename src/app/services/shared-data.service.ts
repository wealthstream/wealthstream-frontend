import { Injectable } from '@angular/core';
import { Customer } from '../models';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    identification: string = '';
    message: string = '';

    data: Customer = {
        idCus: '',
        person: {
            idPer: '',
            name: '',
            surname: '',
            identification: '',
            gender: '',
            age: 0,
            address: '',
            phone: ''
        },
        email: '',
        password: '',
        state: false
    };

    constructor(private _storage: StorageService) {} 

    setCustomer(customer: Customer): void {
        this._storage.encryptData(customer);
    }

    getCustomer(): Customer {
        return  this._storage.decryptData();
    }

    setIdentification(identification: string) {
        this._storage.encryptData(identification);
    }

    getIdentification(): string {
        return this._storage.decryptData();
    }
}
