import { Component } from '@angular/core';
import { AccountMovement, MovementTypeEnum } from 'src/app/models';
import { AccountMovementService } from 'src/app/services';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

    deposit: string = MovementTypeEnum.deposit;
    withdrawal: string = MovementTypeEnum.withdrawal;
    
    accountMovements!: AccountMovement[];

    constructor(private _movementService: AccountMovementService) {}

    ngOnInit(): void {
        this._movementService.getMovementsByIdentification('0850266248').subscribe({
            next: (data) => {
                console.log("DATA ", data);
                this.accountMovements = data;
            }
        });
    }
}
