import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { TransactionalComponent } from './components/transactional/transactional.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertDialogComponent } from './resources/alert-dialog/alert-dialog.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { AccountMovementComponent } from './components/account/account-movement/account-movement.component';
import { SharedDataService } from './services';
import { ReportsComponent } from './components/account/account-movement/report/reports/reports.component';
import { DepositComponent } from './components/account/account-movement/movements/deposit/deposit.component';
import { TransferComponent } from './components/account/account-movement/movements/transfer/transfer.component';
import { WithdrawalComponent } from './components/account/account-movement/movements/withdrawal/withdrawal.component';
import { OurPolicyComponent } from './components/our-policy/our-policy.component';
import { ProfileComponent } from './components/account/account-movement/profile/profile.component';

@NgModule({
	declarations: [
		AppComponent,
		CreateCustomerComponent,
		TransactionalComponent,
		AlertDialogComponent,
		CreateAccountComponent,
		AccountMovementComponent,
  ReportsComponent,
  DepositComponent,
  TransferComponent,
  WithdrawalComponent,
  OurPolicyComponent,
  ProfileComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
		MatDialogModule,
		MatSidenavModule
	],
	exports: [
		MatIconModule
	],
	providers: [
		SharedDataService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
