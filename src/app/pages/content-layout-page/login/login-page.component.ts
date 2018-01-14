import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../../../shared/auth/auth.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

    model: any = {};
    error = '';
    loading = false;

    mfaEnabled: boolean = false;
    mfaToken: string = '';
    @ViewChild('mfa') mfaForm: NgForm;
    @ViewChild('f') loginForm: NgForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService) { }

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
        this.loading = true;
        this.authService.signinUser(this.model.name, this.model.passwd)
            .subscribe(result => {
                if (result === true) {
                    var mfa = this.authService.getUserInfo().mfa;
                    if(mfa == null) {
                        this.redirect();
                    } else {
                        // Show MFA form
                        this.mfaEnabled = true;
                    }
                } else {
                    this.loading = false;
                    this.error = 'Login Failed!';
                    swal(this.error);
                }
                this.loading = false;
                // Reset Form
                this.loginForm.reset();
            });
    }
    redirect() {
        this.authService.storeInfo();
        this.router.navigate(['/main/dashboard'], { replaceUrl: true });
    }

    onMfa() {
        this.loading = true;
        this.authService.mfaAuthentication(this.mfaToken)
        .subscribe(success => {
            if (success) {
                this.redirect();
            } else {
                this.error = 'Invalid Token!';
                swal(this.error);
            }
            this.loading = false;
            this.mfaForm.reset();
        });
    }
    onBackLogin() {
        this.mfaEnabled = false;
        this.mfaForm.reset();
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }

    onDelete() {
        this.router.navigate(['delete'], { relativeTo: this.route.parent });
    }

    onAnonymous() {
        this.authService.toggleAnonymous();
        this.router.navigate(['/main/dashboard'], { replaceUrl: true });
    }
}