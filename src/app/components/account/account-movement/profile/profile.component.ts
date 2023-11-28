import { Component } from '@angular/core';
import { Account, AccountMovement, Customer } from 'src/app/models';
import { AccountMovementService, AccountService, AlertService, CustomerService, IsValidService, SharedDataService } from 'src/app/services';
import { AlertTypeEnum, TitleEnum } from '../../../../models/alert-type-enum';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
    email: string = '';
    phone: string = '';
    address: string = '';
    customer!: Customer;
    account!: Account[];
    movement!: AccountMovement[];
    validation: boolean = false;

    constructor(private _customerService: CustomerService, private _accountService: AccountService,
        private _sharedService: SharedDataService, private _movement: AccountMovementService,
        private _alertService: AlertService, private _isValid: IsValidService) { }

    ngOnInit(): void {
        this.customer = this._sharedService.getCustomer();

        this.email = this.customer.email ?? '';
        this.phone = this.customer.person?.phone ?? '';
        this.address = this.customer.person?.address ?? '';

        this._accountService.getAccountByIdentification(this.customer.person?.identification ?? '').subscribe({
            next: (data) => {
                this.account = data;
            }
        });

        this._movement.getMovementsByIdentification(this.customer.person?.identification ?? '').subscribe({
            next: (data) => {
                this.movement = data;
            }
        });
    }

    updateProfile() {
        this.validation = true;        

        if (!this._isValid.isValid(this.phone) || !this._isValid.isValid(this.address) || !this._isValid.isValid(this.email)) {
            return;
        }

        this.customer = {
            person: {
                idPer: this.customer.idCus,
                identification: this.customer.person?.identification,
                name: this.customer.person?.name,
                surname: this.customer.person?.surname,
                gender: this.customer.person?.gender,
                age: this.customer.person?.age,
                address: this.address,
                phone: this.phone
            },
            password: this.customer.password,
            email: this.email,
            state: this.customer.state
        };

        this._customerService.updateCustomer(this.customer).subscribe({
            next: (data) => {
                this.showAlert(TitleEnum.Ok, 'Has actualizado tu información exitosamente!', AlertTypeEnum.Ok);
            }, error: () => {
                this.showAlert(TitleEnum.Error, 'Nos encontramos fuera de servicio, intentalo más tarde!', AlertTypeEnum.Error);
            }
        });
    }

    showAlert(title: TitleEnum, message: string, type: AlertTypeEnum) {
        this._alertService.showAlert({ title, message, type });
    }
}
