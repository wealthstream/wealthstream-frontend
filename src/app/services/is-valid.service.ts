import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IsValidService {

    constructor() { }

    isValid(value: any) {
        console.log(value);
        
        return !(value === null || value === undefined || value === '' || value === 0);
    }
}
