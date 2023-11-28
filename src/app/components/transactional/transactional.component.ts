import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Customer } from 'src/app/models';
import { AlertTypeEnum, TitleEnum } from 'src/app/models/alert-type-enum';
import { AlertService, CustomerService, SharedDataService } from 'src/app/services';

@Component({
    selector: 'app-transactional',
    templateUrl: './transactional.component.html',
    styleUrls: ['./transactional.component.scss']
})
export class TransactionalComponent {
    identification: string = '';

    constructor(private _router: Router, private _customerService: CustomerService, private _sharedService: SharedDataService, private _alertService: AlertService) {}

    ngOnInit(): void {
        
    }

    searchCustomer(identification: string) {
        if (identification.length < 10) {
            this.showAlert(TitleEnum.Warning, 'La identificación ingresada es inválida', AlertTypeEnum.Warning);
        }
        this._customerService.getcustomerByIdentification(identification).subscribe({
            next: (data: Customer) => {
                if (data.idCus ===  null || data.idCus === undefined) {
                    this._sharedService.setIdentification(identification);
                    this._router.navigate(['/customer']);
                    AppComponent.showBanner = true;
                } else {
                    this._sharedService.setCustomer(data);
                    this._router.navigate(['/auth/login']);
                    AppComponent.showBanner = false;
                }
            }
        });
    }

    showAlert(title: TitleEnum, message: string, type: AlertTypeEnum) {
        this._alertService.showAlert({ title, message, type });
    }
}
