import { Injectable } from '@angular/core';
import { Alert } from '../models';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    alertSource = new Subject<Alert>();
    alert$: Observable<Alert> = this.alertSource.asObservable();

    constructor() { }

    showAlert(alert: Alert) {
        this.alertSource.next(alert);
    }

}
