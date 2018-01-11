import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';
import { checkServerIdentity } from 'tls';
import { User } from 'app/model/user';
import swal from 'sweetalert2';

@Component({
    selector: 'app-register-page',
    templateUrl: './delete-page.component.html',
    styleUrls: ['./delete-page.component.scss'],
})

export class DeletePageComponent {

    model: any = {};
    error = '';
    checked = false;
    user: User;
    loading = false;

    @ViewChild('f') registerForm: NgForm;    

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService) { }

    ngOnInit() {
        this.getUserInfo();
    }

    getUserInfo() {
        this.user = this.authService.getUserInfo();
        console.log(this.user);
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
            this.authService.deleteUser(this.user.id)
                .subscribe(result => {
                    if (result === true) {
                        this.router.navigate(['login'], { relativeTo: this.route.parent });
                        swal("User successfully deleted!");
                        this.loading = false;
                    } else {
                        this.loading = false;
                        swal("User delete failed!");
                        this.error = 'Invalid';
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