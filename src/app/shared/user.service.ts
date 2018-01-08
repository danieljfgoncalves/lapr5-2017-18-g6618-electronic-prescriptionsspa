import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'app/model/user';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Role } from 'app/model/role';
import { AuthService } from 'app/shared/auth/auth.service';

@Injectable()
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken(),
      'client_id': environment.receipts_frontend.client_id,
      'client_secret': environment.receipts_frontend.client_secret,
    });
    let httpOptions = {
      headers: headers
    };
    return httpOptions;
  }

  getUser(id: number): Observable<User> {
    const url = environment.receipts_frontend.url + '/api/users/' + `${id}`;
    return this.http.get(url)
    .map((res: Response) => {

      let userJSON = JSON.parse(JSON.stringify(res));

      let roles: Role[] = new Array();
      for(var i=0; i< userJSON.roles.length; i++) {
        roles[i] = userJSON.roles[i];
      }
      
      return new User(
        userJSON.userID,
        userJSON.username,
        userJSON.email,
        userJSON.mobile,
        roles
      );
      
    });
  }

  getPatients() : Observable<User[]> {
    const url = environment.receipts_frontend.url + "/api/patients";

    return this.http.get(url, this.getHeaders())
      .map((res: Response) => {

        let patientsJSON = JSON.parse(JSON.stringify(res));

        let patients: User[] = new Array();
        for(let patientJSON of patientsJSON) {

          // let roles: Role[] = new Array();
          // for (var i = 0; i < patientJSON.roles.length; i++) {
          //   roles[i] = patientJSON.roles[i];
          // }
          let patient: User = new User(
            patientJSON.userID,
            patientJSON.username,
            patientJSON.email,
            null,
            null,
            //patientJSON.mobile,
            //roles
          );
          patients.push(patient);
        }
        return patients;
      });
  }

}
