import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from '../../model/user';
import { Role } from '../../model/role';

// inner class
class Token { token: string };

@Injectable()
export class AuthService {

  private urlAuth: string = environment.receipts_frontend.url + '/api/authenticate';
  private urlRegister: string = environment.receipts_frontend.url + '/api/register';

  private token: Token;
  public auth: Subject<User> = new Subject<User>();
  private userInfo: User;

  constructor(private http: HttpClient) {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    this.token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
    console.log("[constructor]userinfo: " 
    + ((this.userInfo) ? this.userInfo.roles[0] + this.userInfo.id : "null"));
  }

  signupUser(name: string, password: string, email: string ) {
    //your code for signing up the new user

    var body = { "name": name, "password": password, "email": email, "roles": ["patient"] };

    return new Observable<boolean>(observer => {
      this.http.post<boolean>(this.urlRegister, body)
        .subscribe(data => {
          console.log(data);
          observer.next(true);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          } console.log(err);
          observer.next(false);
        });
    });
  }

  signinUser(name: string, password: string): Observable<boolean> {
    //your code for checking credentials and getting tokens for for signing in user

    return new Observable<boolean>(observer => {
      this.http.post<Token>(this.urlAuth, { name: name, password: password })
        .subscribe(data => {
          if (data.token) {
            const tokenDecoded = jwt_decode(data.token);
            this.userInfo = {
              id: tokenDecoded.userID,
              name: tokenDecoded.name,
              email: tokenDecoded.email,
              mobile: tokenDecoded.mobile,
              roles: tokenDecoded.roles
            }

            localStorage.userInfo = JSON.stringify(this.userInfo);
            localStorage.token = data.token;

            localStorage.removeItem('anonymous');

            this.auth.next(this.userInfo);
            observer.next(true);
          } else {
            this.auth.next(this.userInfo);
            observer.next(false);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          } console.log(err);
          this.auth.next(this.userInfo);
          observer.next(false);
        });
    });
  }

  logout() {   
    this.token = null;
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    localStorage.removeItem('anonymous');
    this.auth.next(this.userInfo);
  }

  getToken() {    
    return localStorage.getItem('token');
  }

  getUserInfo() {
    return this.userInfo;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token 
    return tokenNotExpired();
  }

  hasRole(role : Role) {
    // here you can check the user's role
    return this.userInfo.roles.includes(role);
  }

  hasRoles(roles: Role[]) {
    // here you can check the user's role
    if (!this.userInfo) return false;

    let bool = false;
    for(let myRole of this.userInfo.roles) {
      bool = bool || roles.includes(myRole);
    }
    return bool;
  }

  toggleAnonymous() {

    if (!localStorage.getItem('anonymous')) {
      localStorage.anonymous = JSON.stringify(true);
    }
  }

  isAnonymous() {
    return localStorage.getItem('anonymous') != undefined;
  }
}
