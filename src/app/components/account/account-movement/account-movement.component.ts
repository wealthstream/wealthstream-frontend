import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Account, AccountMovement, Customer, MovementTypeEnum, Transfer } from 'src/app/models';
import { AlertTypeEnum, TitleEnum } from 'src/app/models/alert-type-enum';
import { AccountMovementService, AccountService, AlertService, SharedDataService } from 'src/app/services';

@Component({
    selector: 'app-account-movement',
    templateUrl: './account-movement.component.html',
    styleUrls: ['./account-movement.component.scss']
})
export class AccountMovementComponent {
    title: string = '';
    identification = '';
    nameCustomer: string = '';
    movementType!: AccountMovement[];

    constructor(private _alertService: AlertService, private _accountService: AccountService, private _movement: AccountMovementService, private _router: Router, public _sharedService: SharedDataService) {}

    ngOnInit(): void {
    }

    summarize() {
        this.title = 'Tus movimientos'
        this._router.navigate(['/movement/summarize']);
    }

    deposit() {
        this.title = 'Llena los campos para realizar tu transacción'
        this._router.navigate(['/movement/deposit']);
    }

    withdrawal() {
        this.title = 'Llena los campos para realizar tu transacción'
        this._router.navigate(['/movement/withdrawal']);
    }

    transfer() {
        this.title = 'Llena los campos para realizar tu transacción'
        this._router.navigate(['/movement/transfer']);
    }

}
