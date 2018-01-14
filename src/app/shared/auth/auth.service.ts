import {
  Router
} from '@angular/router';
import {
  Injectable
} from '@angular/core';
import {
  environment
} from '../../../environments/environment';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import {
  Subject
} from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import {
  tokenNotExpired
} from 'angular2-jwt';
import {
  User
} from '../../model/user';
import {
  Registration
} from '../../model/registration';
import {
  Role
} from '../../model/role';
import { Observable } from 'rxjs/Rx';

// inner class
class Token {
  token: string
};
class MedToken {
  access_token: string
};
class MfaAuth {
  mfa: boolean
}

@Injectable()
export class AuthService {

  private urlAuth: string = environment.receipts_frontend.url + '/api/authenticate';
  private urlMfa: string = environment.receipts_frontend.url + '/api/authenticate/mfa';
  private urlRegister: string = environment.receipts_frontend.url + '/api/signup';
  private urlDelete: string = environment.receipts_frontend.url + '/api/deleteAccount';

  private token: Token;
  public auth: Subject<User> = new Subject<User>();
  private userInfo: User;

  // Temporary values until values are stored int the local storage
  private temp_token: string;
  private med_token: string;

  constructor(private http: HttpClient) {
    this.token = JSON.parse(JSON.stringify(localStorage.getItem('token')));
  }

  signupUser(username: string, password: string, email: string, mfa:boolean) {
    //your code for signing up the new user
    var options = {
      headers: {
        'content-type': 'application/json',
        'client_id': environment.receipts_frontend.client_id,
        'client_secret': environment.receipts_frontend.client_secret,
      }
    };
    var body = {
      "username": username,
      "password": password,
      "email": email,
      "mfa":mfa
    };
    return new Observable<Registration>(observer => {
      this.http.post<Registration>(this.urlRegister, body, options)
        .subscribe(data => {
          console.log(data);
          observer.next(data);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          console.log(err);
          observer.next(null);
        });
    });
  }

  signinUser(name: string, password: string): Observable<boolean> {
    //your code for checking credentials and getting tokens for for signing in user
    var options = {
      headers: {
        'content-type': 'application/json',
        'client_id': environment.receipts_frontend.client_id,
        'client_secret': environment.receipts_frontend.client_secret,
      }
    };

    return new Observable<boolean>(observer => {
      this.http.post<Token>(this.urlAuth, {
        username: name,
        password: password
      }, options)
        .subscribe(data => {
          if (data.token) {
            const tokenDecoded = jwt_decode(data.token);

            var mfa = null;
            if (tokenDecoded["https://lapr5.isep.pt/mfa"]) {
              var mfa = tokenDecoded["https://lapr5.isep.pt/mfa"].secret
            }
            this.userInfo = {
              id: tokenDecoded.sub,
              name: name,
              email: tokenDecoded["https://lapr5.isep.pt/email"],
              mobile: tokenDecoded["https://lapr5.isep.pt/user_info"].mobile,
              roles: tokenDecoded["https://lapr5.isep.pt/roles"],
              mfa: mfa
            }
            const url = 'https://lapr5-3da.eu.auth0.com/oauth/token'
            this.http.post<MedToken>(url,
              {
                grant_type: 'client_credentials',
                client_id: environment.receipts_frontend.client_id,  //   'JlBREWOiSAE87o0MZjymMkH8z5wPX7QW',
                client_secret: environment.receipts_frontend.client_secret,  //   'xVeQAFK7NeZZXSJ7ZQeA2H6ouILGkGIyxBNKVPo-8W5tzDC-0o_vIwF96veW9V7b',
                audience: "https://medicines-backend-api/"
              }).subscribe(medToken => {
                this.temp_token = data.token;
                this.med_token = medToken.access_token;
                this.auth.next(this.userInfo);
                observer.next(true);
              });
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
          }
          console.log(err);
          this.auth.next(this.userInfo);
          observer.next(false);
        });
    });
  }

  storeInfo() {
    localStorage.token = this.temp_token;
    localStorage.removeItem('anonymous');
    localStorage.medicinesToken = this.med_token;
  }

  mfaAuthentication(token: string): Observable<boolean> {

    return new Observable<boolean>(observer => {
      
      if (!this.userInfo) observer.next(false);

      var options = {
        headers: {
          'content-type': 'application/json'
        }
      };
      this.http.post<MfaAuth>(this.urlMfa, {
        secret: this.userInfo.mfa,
        token: token
      }, options)
        .subscribe(mfa => { 
          observer.next(mfa.mfa);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          console.log(err);
          this.auth.next(this.userInfo);
          observer.next(false);
        });
    });
  }

  deleteUser(id: string) {
    //your code for signing up the new user
    var options = {
      headers: {
        'content-type': 'application/json',
        'client_id': environment.receipts_frontend.client_id,
        'client_secret': environment.receipts_frontend.client_secret,
      }
    };

    return new Observable<boolean>(observer => {
      this.http.delete<boolean>(this.urlDelete + "/" + id, options)
        .subscribe(data => {
          console.log(data);
          observer.next(true);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          console.log(err);
          observer.next(false);
        });
    });
  }



  logout() {
    this.token = null;
    this.userInfo = null;
    localStorage.removeItem('token');
    localStorage.removeItem('medicinesToken');
    localStorage.removeItem('anonymous');
    this.auth.next(this.userInfo);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getMedicinesToken() {

    return localStorage.getItem('medicinesToken');
  }

  getUserInfo() {
    if (!this.userInfo) {
      var mfa = null;
      const tokenDecoded = jwt_decode(this.getToken());
      if (tokenDecoded["https://lapr5.isep.pt/mfa"]) {
        var mfa = tokenDecoded["https://lapr5.isep.pt/mfa"].secret
      }
      this.userInfo = {
        id: tokenDecoded.sub,
        name: tokenDecoded['https://lapr5.isep.pt/username'],
        email: tokenDecoded['https://lapr5.isep.pt/email'],
        mobile: tokenDecoded.mobile,
        roles: tokenDecoded['https://lapr5.isep.pt/roles'],
        mfa: mfa
      }
      console.log(tokenDecoded);
    }

    return this.userInfo;
  }

  isAuthenticated() {
    // here you can check if user is authenticated or not through his token
    if(this.getToken == null) return false;
    return tokenNotExpired();
  }

  hasRole(role: Role) {
    // here you can check the user's role
    return this.userInfo.roles.includes(role);
  }

  hasRoles(roles: Role[]) {
    // here you can check the user's role
    if (!this.userInfo) return false;

    let bool = false;
    for (let myRole of this.userInfo.roles) {
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

