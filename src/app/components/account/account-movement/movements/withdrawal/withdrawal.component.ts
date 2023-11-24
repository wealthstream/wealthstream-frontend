import { Component } from '@angular/core';
import { Account, AccountMovement, Customer, MovementTypeEnum } from 'src/app/models';
import { AlertTypeEnum, TitleEnum } from 'src/app/models/alert-type-enum';
import { AccountMovementService, AccountService, AlertService, SharedDataService } from 'src/app/services';

@Component({
    selector: 'app-withdrawal',
    templateUrl: './withdrawal.component.html',
    styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent {
    accountType: string = '';
    selectedAccount?: Account;
    movementType: string = MovementTypeEnum.withdrawal;
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
                console.log("error", error);
            }
        }
        );
    }

    makeWithdrawal() {
        this.accountMovement = {
            idAcc: {
                accountNumber: this.selectedAccount?.accountNumber
            },
            movementType: MovementTypeEnum.withdrawal.toString(),
            value: this.value
        }

        this._movement.makeWithdrawal(this.accountMovement).subscribe({
            next: (data) => {
                if (this.selectedAccount === null || this.selectedAccount === undefined) {
                    return;
                }
                
                if (data.body?.idAcc?.initialBalance??0 > this.value) {
                    this.showAlert(TitleEnum.Ok, 'Tu retiro se realizó exitosamente!', AlertTypeEnum.Ok);
                    this.selectedAccount.initialBalance = data.body?.balance;
                    this.clear();
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
    }

    showAlert(title: TitleEnum, message: string, type: AlertTypeEnum) {
        this._alertService.showAlert({ title, message, type });
    }
}
