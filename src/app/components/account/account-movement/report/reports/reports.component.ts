import { Component } from '@angular/core';
import { AccountMovement, MovementTypeEnum } from 'src/app/models';
import { AccountMovementService, CustomerService, SharedDataService } from 'src/app/services';
import { Customer } from '../../../../../models/customer.model';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

    deposit: string = MovementTypeEnum.deposit;
    withdrawal: string = MovementTypeEnum.withdrawal;
    
    accountMovements!: AccountMovement[];
    customer!: Customer;

    constructor(private _movementService: AccountMovementService, private _sharedService: SharedDataService) {}

    ngOnInit(): void {
        this.customer = this._sharedService.getCustomer();
        this._movementService.getMovementsByIdentification(this.customer.person?.identification??'').subscribe({
            next: (data) => {
                this.accountMovements = data;
            }
        });
    }
}
