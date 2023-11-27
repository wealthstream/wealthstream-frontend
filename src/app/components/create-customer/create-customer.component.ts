import { Component } from '@angular/core';
import { AlertService, CustomerService, IsValidService, SharedDataService, ValidatePasswordService } from 'src/app/services';
import { Customer } from 'src/app/models';
import { AlertTypeEnum, TitleEnum } from 'src/app/models/alert-type-enum';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-customer',
    templateUrl: './create-customer.component.html',
    styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent {
    identification: string = '';
    name: string = '';
    surname: string = '';
    password: string = '';
    email: string = '';
    age: number = 0;
    gender: string = '';
    phone: string = ''
    address: string = '';

    checkPassword: boolean = false;
    checkEmail: boolean = false;
    validation: boolean = false;

    customer!: Customer;

    constructor(private _customerService: CustomerService, private _sharedService: SharedDataService,
        private _alertService: AlertService, private _passwordService: ValidatePasswordService,
        private _isValid: IsValidService, private _router: Router) { }

    ngOnInit(): void {
    }

    createCustomer() {
        this.validation = true;

        if (!this._isValid.isValid(this.identification) || !this._isValid.isValid(this.name) || !this._isValid.isValid(this.surname) ||
            !this._isValid.isValid(this.password) || !this._isValid.isValid(this.email) || !this._isValid.isValid(this.age) ||
            !this._isValid.isValid(this.gender) || !this._isValid.isValid(this.phone) || !this._isValid.isValid(this.address)) {
            return;
        }

        if (!this._passwordService.validatePassword(this.password)) {
            this.checkPassword = true;
            return;
        } else {
            this.checkPassword = false;
        }


        this.checkPassword = false;
        this.validation = false;
        this.customer = {
            idCus: '',
            person: {
                idPer: '',
                name: this.name,
                surname: this.surname,
                identification: this.identification,
                gender: this.gender,
                age: this.age,
                address: this.address,
                phone: this.phone
            },
            password: this.password,
            email: this.email,
            state: true
        }

        this._customerService.createCustomer(this.customer).subscribe({
            next: (data) => {
                if (data.body !== null) {
                    this.showAlert(TitleEnum.Ok, 'Te has registrado exitosamente!', AlertTypeEnum.Ok);
                    this._sharedService.setCustomer(data.body);
                    this._router.navigate(['/account']);
                } else {
                    this.showAlert(TitleEnum.Warning, 'Ya te encuentras registrado!', AlertTypeEnum.Warning);
                }
            }, error: () => {
                this.showAlert(TitleEnum.Error, 'Nos encontramos fuera de servicio, intentalo más tarde!', AlertTypeEnum.Error);
            }
        });
    }

    showAlert(title: TitleEnum, message: string, type: AlertTypeEnum) {
        this._alertService.showAlert({ title, message, type });
    }

}
