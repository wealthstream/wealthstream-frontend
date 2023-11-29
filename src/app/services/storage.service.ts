import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private encryptionKey: string;

    constructor() {
        this.encryptionKey =environment.PASSWORD_SECRET;
    }

    encryptData(data: any): void {
        try {
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptionKey).toString();
            
            localStorage.setItem('encryptedData', encryptedData);
        } catch (error) {
            console.error('Error encrypting data:', error);
        }
    }

    decryptData(): any {
        try {
            const encryptedData = localStorage.getItem('encryptedData');
            if (encryptedData) {
                const bytes = CryptoJS.AES.decrypt(encryptedData, this.encryptionKey);
                if (bytes.toString()) {
                    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                }
            }
        } catch (error) {
            console.error('Error decrypting data:', error);
        }
        return null;
    }

    clearData(): void {
        localStorage.removeItem('encryptedData');
    }
}