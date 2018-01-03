import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../auth/auth.service'; 
import { User } from '../../model/user';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { LoginPageComponent } from '../../pages/content-layout-page/login/login-page.component'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

    subscriptionAuth: Subscription;
    userInfo: User;

    constructor(private authService: AuthService,
                public cdr: ChangeDetectorRef) { 
    }


                //TODO: Review navbar refresh

    ngOnInit() {
        this.userInfo = this.authService.getUserInfo();
        this.subscriptionAuth = this.authService.auth.subscribe((userInfo) => {        
            this.userInfo = userInfo;
            this.cdr.detectChanges();
        });
    }

    ngOnDestroy() {
        this.subscriptionAuth.unsubscribe();
    }

    toggleClass = 'ft-maximize';
    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        }
        else
            this.toggleClass = 'ft-maximize'
    }
}
