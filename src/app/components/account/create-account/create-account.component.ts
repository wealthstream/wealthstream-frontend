import { Component } from '@angular/core';
import { AccountType, Customer } from 'src/app/models';
import { AccountService, AlertService, IsValidService, SharedDataService } from 'src/app/services';
import { Account } from '../../../models/account.model';
import { AlertTypeEnum, TitleEnum } from 'src/app/models/alert-type-enum';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

    accountType: string = '';
    initialBalance: number = 0.0;

    account!: Account;
    customer!: Customer;

    savingType: string = AccountType.saving.toString();
    currentAccount: string = AccountType.currrent.toString();

    validation: boolean = false;

    constructor(private _accountService: AccountService, private _alertService: AlertService, 
        private _router: Router, public _sharedService: SharedDataService, private _isValid: IsValidService, private _location: Location) {}

    ngOnInit(): void {
        // this.customer = this._sharedService.getCustomer();
        // if (this._location.path().startsWith('/login') || this._location.path() === '/movement' ||
        //     this._location.path() === '/movement/profile' || this._location.path() === '/movement/summarize' ||
        //     this._location.path() === '/movement/deposit' || this._location.path() === '/movement/withdrawal' ||
        //     this._location.path() === '/movement/transfer') {
        //     this.showBanner = false;
        // }
    }

    createAccount() {
        if (!this._isValid.isValid(this.accountType)) {
            this.validation = true;
            return;
        }

        this.validation = false;

        this.account = {
            idCus: {
                idCus: this.customer.idCus,
            },
            accountType: this.accountType,
            initialBalance: this.initialBalance,
            state: true
        }

        this._accountService.createAccount(this.account).subscribe({
            next: (data) => {
                if (data.body !== null && data.body !== undefined) {
                    this.clear();
                    this._router.navigate(['/movement']);
                    this.showAlert(TitleEnum.Ok, 'Has registrado tu cuenta exitosamente!', AlertTypeEnum.Ok);
                } else {
                    this.showAlert(TitleEnum.Warning, 'Tu cuenta ya se encuentra registrada!', AlertTypeEnum.Warning);
                }
            }, error: () => {
                this.showAlert(TitleEnum.Error, 'Nos encontramos fuera de servicio, intentalo más tarde!', AlertTypeEnum.Error);
            }
        });
    }

    showAlert(title: TitleEnum, message: string, type: AlertTypeEnum) {
        this._alertService.showAlert({ title, message, type });
    }

    clear() {
        this.accountType = '';
        this.initialBalance = 0.0;
    }

    
}
