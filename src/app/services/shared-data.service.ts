import { Injectable } from '@angular/core';
import { Customer } from '../models';

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

    constructor() { }
}
