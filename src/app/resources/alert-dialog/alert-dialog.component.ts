import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alert } from 'src/app/models';
import { AlertTypeEnum } from 'src/app/models/alert-type-enum';

@Component({
    selector: 'app-alert-dialog',
    templateUrl: './alert-dialog.component.html',
    styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
    title?: string;
    showAlert: boolean = false;
    alertType?: AlertTypeEnum;
    message: string = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: Alert,
        private _alert: MatDialogRef<AlertDialogComponent>
    ) { }

    ngOnInit(): void {
        this.title = this.data.title;
        this.message = this.data.message;
        this.alertType = this.data.type;
    }
}
