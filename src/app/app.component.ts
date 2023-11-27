import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from './services';
import { AlertDialogComponent } from './resources/alert-dialog/alert-dialog.component';
import { Alert } from './models';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'wealthstream-frontend';
    alertType: string = "alert";

    showBanner: boolean = true;

    constructor(public alert: MatDialog,
        private _alertService: AlertService, private _location: Location) { }

    ngOnInit(): void {
        this._alertService.alert$.subscribe((res: Alert) => {
            this.alert.open(AlertDialogComponent, {
                disableClose: true,
                data: res
            });
            setTimeout(() => { this.alert.closeAll(); }, environment.timeOutAlert)
        });

        if (this._location.path().startsWith('/login') || this._location.path() === '/movement' ||
            this._location.path() === '/movement/profile' || this._location.path() === '/movement/summarize' ||
            this._location.path() === '/movement/deposit' || this._location.path() === '/movement/withdrawal' ||
            this._location.path() === '/movement/transfer') {
            this.showBanner = false;
        }

    }
}
