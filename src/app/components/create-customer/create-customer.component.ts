import { Component } from '@angular/core';
import { AlertService, CustomerService, SharedDataService } from 'src/app/services';
import { Customer } from 'src/app/models';
import { Person } from '../../models/person.model';
import { AlertTypeEnum, TitleEnum } from 'src/app/models/alert-type-enum';
import { MatDialog } from '@angular/material/dialog';
import { HttpStatusCode } from '@angular/common/http';
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

    customer!: Customer;

    constructor(private _customerService: CustomerService, private _sharedService: SharedDataService, private _alertService: AlertService, private _router: Router) { }

    ngOnInit(): void {
    }

    createCustomer() {
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
