import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { TransactionalComponent } from './components/transactional/transactional.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { AccountMovementComponent } from './components/account/account-movement/account-movement.component';
import { DepositComponent } from './components/account/account-movement/movements/deposit/deposit.component';
import { WithdrawalComponent } from './components/account/account-movement/movements/withdrawal/withdrawal.component';
import { TransferComponent } from './components/account/account-movement/movements/transfer/transfer.component';
import { ReportsComponent } from './components/account/account-movement/report/reports/reports.component';
import { OurPolicyComponent } from './components/our-policy/our-policy.component';
import { ProfileComponent } from './components/account/account-movement/profile/profile.component';

const routes: Routes = [
    { path: "customer", component: CreateCustomerComponent },
    { path: "transactional", component: TransactionalComponent },
    { path: "account", component: CreateAccountComponent },
    {
        path: "movement", component: AccountMovementComponent,
        children: [
            { path: 'summarize', component: ReportsComponent },
            { path: 'deposit', component: DepositComponent },
            { path: 'withdrawal', component: WithdrawalComponent },
            { path: 'transfer', component: TransferComponent },
            { path: "profile", component: ProfileComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
