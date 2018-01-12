import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { checkServerIdentity } from 'tls';
import * as alertFunctions from '../../../shared/data/sweet-alerts';
import swal from 'sweetalert2';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})

export class RegisterPageComponent {

    model: any = {};
    error = '';
    checked = false;
    loading = false;

    @ViewChild('f') registerForm: NgForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService) { }

    ngOnInit() {
        this.authService.logout();
        this.route.params.subscribe(params => {
            if (params['u'] !== undefined) {
                this.error = 'Something went wrong!';
            }
        });
    }

    eulaAlert() {
        alertFunctions.eulaAlert();
    }

    privacyPolicyAlert() {
        alertFunctions.privacyPolicyAlert();
    }

    check() {
        if (this.checked) {
            this.checked = false;
        } else {
            this.checked = true;
        }
    }

    //  On submit click, reset field value
    onSubmit() {
        this.loading = true;
        if (this.checked) {
            this.authService.signupUser(this.model.username, this.model.password, this.model.email)
                .subscribe(result => {
                    if (result === true) {
                        this.loading = false;
                        swal("User successfully registered!");
                        this.router.navigate(['login'], { relativeTo: this.route.parent });
                    } else {
                        this.error = 'Invalid';
                        swal("User register failed!");
                        this.loading = false;
                    }
                });
            this.registerForm.reset();
        } else {
            this.error = 'Invalid';
            swal(this.error);
            this.loading = false;
        }

    }
}