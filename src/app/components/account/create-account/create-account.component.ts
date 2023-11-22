import { Component } from '@angular/core';
import { SharedDataService } from 'src/app/services';

@Component({
    selector: 'app-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

    constructor(private _sharedService: SharedDataService) {}

    ngOnInit(): void {
        console.log(this._sharedService.identification);
        console.log(this._sharedService.data);
    }
}
