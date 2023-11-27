import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidatePasswordService {

    constructor() { }

    validatePassword(password: string): boolean {
        const minLength = 8;

        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

        if (password.length < minLength) {
            return false;
        }

        if (!uppercaseRegex.test(password) ||
            !lowercaseRegex.test(password) ||
            !numberRegex.test(password) ||
            !specialCharsRegex.test(password)) {
            return false;
        }

        return true;
    }
}
