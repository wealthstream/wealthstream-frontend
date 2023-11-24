import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models';
import { CustomerService, SharedDataService } from 'src/app/services';

@Component({
    selector: 'app-transactional',
    templateUrl: './transactional.component.html',
    styleUrls: ['./transactional.component.scss']
})
export class TransactionalComponent {
    identification: string = '';

    constructor(private _router: Router, private _customerService: CustomerService, private _sharedService: SharedDataService) {}

    ngOnInit(): void {
    }

    serachCustomer(identification: string) {
        this._customerService.getcustomerByIdentification(identification).subscribe({
            next: (data: Customer) => {
                if (data.idCus ===  null || data.idCus === undefined) {
                    this._sharedService.setIdentification(identification);
                    this._router.navigate(['/customer']);
                } else {
                    this._sharedService.setCustomer(data);
                    this._router.navigate(['/account']);
                }
            }
        });
    }
}
