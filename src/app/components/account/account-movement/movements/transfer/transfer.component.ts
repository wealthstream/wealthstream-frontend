import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account, AccountMovement, Customer, MovementTypeEnum, Transfer } from 'src/app/models';
import { AlertTypeEnum, TitleEnum } from 'src/app/models/alert-type-enum';
import { AccountMovementService, AccountService, AlertService, SharedDataService } from 'src/app/services';

@Component({
    selector: 'app-transfer',
    templateUrl: './transfer.component.html',
    styleUrls: ['./transfer.component.scss']
})
export class TransferComponent {
    accountType: string = '';
    destinationAccount: string = '';
    selectedAccount?: Account;
    movementType: string = MovementTypeEnum.transfer;
    value: number  = 0;
    initialBalance: number = 0;
    balance: number = 0;

    account!: Account[];
    accountMovement!: AccountMovement;
    transfer!: Transfer;
    customer!: Customer;

    constructor(private _alertService: AlertService, private _accountService: AccountService, private _movement: AccountMovementService, private _router: Router, public _sharedService: SharedDataService) {}

    ngOnInit(): void {
        this.customer = this._sharedService.getCustomer();
        this._accountService.getAccountByIdentification(this.customer.person?.identification??'').subscribe({
            next: (data) => {
                this.account = data;
            }, error: (error) => {
                console.log("error", error); 
            }
        }
        );
    }

    makeTransfer() {
        this.transfer = {
            originAccount: this.selectedAccount?.accountNumber??'',
            destinationAccount: this.destinationAccount,
            value: this.value
        }

        this._movement.makeTransfer(this.transfer).subscribe({
            next: (data) => {
                
                if (this.selectedAccount === null || this.selectedAccount === undefined) {
                    return;
                };

                if (data.body?.idAcc?.initialBalance??0 > this.value) {
                    this.showAlert(TitleEnum.Ok, 'Tu transferencia se realizó exitosamente!', AlertTypeEnum.Ok);
                    this.selectedAccount.initialBalance = data.body?.balance;
                } else {
                    this.showAlert(TitleEnum.Warning, 'No tienes suficientes fondos, para realizar esta transacción!', AlertTypeEnum.Warning);
                    return;
                }
            }, error: () => {
                this.showAlert(TitleEnum.Error, 'Nos encontramos fuera de servicio, intentalo más tarde!', AlertTypeEnum.Error);
            }
        });
    }

    clear() {
        this.value = 0.0;
        this.destinationAccount = ''
    }

    showAlert(title: TitleEnum, message: string, type: AlertTypeEnum) {
        this._alertService.showAlert({ title, message, type });
    }
}
