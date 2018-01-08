import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { checkServerIdentity } from 'tls';
import * as alertFunctions from '../../../shared/data/sweet-alerts';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})

export class RegisterPageComponent {

    model: any = {};
    error = '';
    checked = false;

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

        if (this.checked) {
            this.authService.signupUser(this.model.name, this.model.password, this.model.email)
                .subscribe(result => {
                    if (result === true) {
                        this.router.navigate(['login'], { relativeTo: this.route.parent });
                    } else {
                        // TODO: Alert view
                        this.error = 'Invalid';
                    }
                });

            this.registerForm.reset();
        } else {
            // TODO: Alert view
            this.error = 'Invalid';
        }

    }
}