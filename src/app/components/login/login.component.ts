import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LogIn } from 'src/app/models';
import { SanckbarComponent } from 'src/app/resources/sanckbar/sanckbar.component';
import { LogInService } from 'src/app/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    email: string = '';
    password: string = '';

    login!: LogIn;
    duration: number = 5;

    constructor(private _router: Router, private _login: LogInService, private _snackBar: MatSnackBar) { }

    auth() {
        this.login = {
            email: this.email,
            password: this.password
        };

        this._login.login(this.login).subscribe({
            next: (data) => {
                if (data === null || data === undefined) {
                    this._snackBar.openFromComponent(SanckbarComponent, {
                        duration: this.duration * 1000
                    });
                    return;
                }

                localStorage.setItem("token", data.accessToken);
                this._router.navigate(['/movement']);
            }
        });
    }
}
