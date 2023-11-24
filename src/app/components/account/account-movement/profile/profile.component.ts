import { Component } from '@angular/core';
import { Account, AccountMovement, Customer } from 'src/app/models';
import { AccountMovementService, AccountService, CustomerService, SharedDataService } from 'src/app/services';

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

    constructor(private _customerService: CustomerService, private _accountService: AccountService, private _sharedService: SharedDataService, private _movement: AccountMovementService) {}

    ngOnInit(): void {
        this.customer = this._sharedService.getCustomer();
        
        this.email = this.customer.email??'';
        this.phone = this.customer.person?.phone??'';
        this.address = this.customer.person?.address??'';

        this._accountService.getAccountByIdentification(this.customer.person?.identification??'').subscribe({
            next: (data) => {
                console.log(data);
                this.account = data;
            }
        });

        this._movement.getMovementsByIdentification(this.customer.person?.identification??'').subscribe({
            next: (data) => {
                this.movement = data;
            }
        });
    }
}
