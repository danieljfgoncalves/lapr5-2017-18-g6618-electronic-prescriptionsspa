import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../../../shared/auth/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

    model: any = {};
    error = '';

    @ViewChild('f') loginForm: NgForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService ) { }

    ngOnInit() {
        this.authService.logout();
        this.route.params.subscribe(params => {
            if (params['u'] !== undefined) {
                this.error = 'Your user cannot access receipts';
            }
        });
    }

    // On submit button click    
    onLogin() {

        this.authService.signinUser(this.model.name, this.model.passwd)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/main/dashboard'], { replaceUrl: true });
                } else {
                    // TODO: Alert view
                    this.error = 'Username or password is incorrect';
                }
            });

        // Reset Form
        this.loginForm.reset();
    }
    // On registration link click
    onRegister() {
        // TODO: Register
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

    onAnonymous() {
        this.authService.toggleAnonymous();
        this.router.navigate(['/main/dashboard'], { replaceUrl: true });
    }
}