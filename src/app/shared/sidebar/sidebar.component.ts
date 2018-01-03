import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { RouteInfo } from "./sidebar.metadata";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from 'rxjs/Subscription';
import { User } from 'app/model/user';
import { AuthService } from 'app/shared/auth/auth.service';
import { Role } from 'app/model/role';

declare var $: any;
@Component({
    // moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];

    subscriptionAuth: Subscription;
    userInfo: User;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService,
        public cdr: ChangeDetectorRef) {
    }

    ngOnInit() {

        this.userInfo = this.authService.getUserInfo();
        this.subscriptionAuth = this.authService.auth.subscribe((userInfo) => {
            this.userInfo = userInfo;
        });

        $.getScript('./assets/js/app-sidebar.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem);

    }

    ngOnDestroy() {
        this.subscriptionAuth.unsubscribe();
    }
}