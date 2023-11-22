import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { TransactionalComponent } from './components/transactional/transactional.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';

const routes: Routes = [
    { path: "customer", component: CreateCustomerComponent },
    { path: "transactional", component: TransactionalComponent},
    { path: "account", component: CreateAccountComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
