import { Component } from '@angular/core';
import { Account, AccountMovement, Customer, MovementTypeEnum } from 'src/app/models';
import { AlertTypeEnum, TitleEnum } from 'src/app/models/alert-type-enum';
import { AccountMovementService, AccountService, AlertService, SharedDataService } from 'src/app/services';

@Component({
    selector: 'app-deposit',
    templateUrl: './deposit.component.html',
    styleUrls: ['./deposit.component.scss']
})
export class DepositComponent {
    accountType: string = '';
    selectedAccount?: Account;
    movementType: string = MovementTypeEnum.deposit;
    value: number  = 0;
    initialBalance: number = 0;
    balance: number = 0;

    account!: Account[];
    accountMovement!: AccountMovement;
    customer!: Customer;

    constructor(private _alertService: AlertService, private _accountService: AccountService, private _movement: AccountMovementService, public _sharedService: SharedDataService) {}

    ngOnInit(): void {
        this.customer = this._sharedService.getCustomer();
        this._accountService.getAccountByIdentification(this.customer.person?.identification??'').subscribe({
            next: (data) => {
                this.account = data;                
            }, error: (error) => {
                
            }
        }
        );
    }

    makeDeposit() {
        this.accountMovement = {
            idAcc: {
                accountNumber: this.selectedAccount?.accountNumber
            },
            movementType: MovementTypeEnum.deposit.toString(),
            value: this.value
        }

        this._movement.makeDeposit(this.accountMovement).subscribe({
            next: (data) => {
                this.showAlert(TitleEnum.Ok, 'Tu depósito se realizó exitosamente!', AlertTypeEnum.Ok);
                if (this.selectedAccount === null || this.selectedAccount === undefined) {
                    return;
                }
                this.selectedAccount.initialBalance = data.body?.balance;
                this.clear();
            }, error: () => {
                this.showAlert(TitleEnum.Error, 'Nos encontramos fuera de servicio, intentalo más tarde!', AlertTypeEnum.Error);
            }
        });
    }

    clear() {
        this.value = 0.0;
    }

    showAlert(title: TitleEnum, message: string, type: AlertTypeEnum) {
        this._alertService.showAlert({ title, message, type });
    }
}
