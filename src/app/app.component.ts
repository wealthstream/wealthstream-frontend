import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from './services';
import { AlertDialogComponent } from './resources/alert-dialog/alert-dialog.component';
import { Alert } from './models';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'wealthstream-frontend';
    showAlert: boolean = false;
    alertType: string = "alert";
    message: string = '';

    constructor(public alert: MatDialog,
        private _alerteService: AlertService,) { }

    ngOnInit(): void {
        this._alerteService.alert$.subscribe((res: Alert) => {
            this.alert.open(AlertDialogComponent, {
                disableClose: true,
                data: res 
            });
            setTimeout(() => { this.alert.closeAll(); }, environment.timeOutAlert)
        });
    }
}
