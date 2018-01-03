import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss']
})

export class RegisterPageComponent {

    model: any = {};
    error = '';

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

    //  On submit click, reset field value
    onSubmit() {


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
    }
}