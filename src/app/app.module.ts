import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { CreateCustomerComponent } from './components/create-customer/create-customer.component';
import { TransactionalComponent } from './components/transactional/transactional.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertDialogComponent } from './resources/alert-dialog/alert-dialog.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { AccountMovementComponent } from './components/account/account-movement/account-movement.component';

@NgModule({
	declarations: [
		AppComponent,
		CreateCustomerComponent,
		TransactionalComponent,
		AlertDialogComponent,
  CreateAccountComponent,
  AccountMovementComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
		MatDialogModule
	],
	exports: [
		MatIconModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
