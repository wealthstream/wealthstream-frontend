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
import { LoginComponent } from './components/login/login.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';

const routes: Routes = [
    { path: "", redirectTo: '/transactional', pathMatch: 'full' },
    { path: "customer", component: CreateCustomerComponent, canActivate: [ AuthGuardGuard ] },
    { path: "transactional", component: TransactionalComponent },
    { path: "account", component: CreateAccountComponent, canActivate: [ AuthGuardGuard ] },
    {
        path: "movement", component: AccountMovementComponent, canActivate: [ AuthGuardGuard ],
        children: [
            { path: 'summarize', component: ReportsComponent, canActivate: [ AuthGuardGuard ] },
            { path: 'deposit', component: DepositComponent, canActivate: [ AuthGuardGuard ] },
            { path: 'withdrawal', component: WithdrawalComponent, canActivate: [ AuthGuardGuard ] },
            { path: 'transfer', component: TransferComponent, canActivate: [ AuthGuardGuard ] },
            { path: "profile", component: ProfileComponent, canActivate: [ AuthGuardGuard ] }
        ]
    },
    { path: "auth/login", component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
