import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Role } from 'app/model/role';

@Injectable()
export class CheckRoleGuard implements CanActivate {

    constructor(private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // Retrieve the allowed roles from `route.data`.
        const allowedRoles = route.data['allowedRoles'];
        return this.authService.isAuthenticated() && this.authService.hasRoles(allowedRoles);
    }
}