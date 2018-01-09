import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Prescription } from 'app/model/prescription';
import 'rxjs/add/operator/map'

import { Presentation } from './model/presentation';
import { Comment } from './model/comment';
import { Posology } from 'app/model/posology';
import { AuthService } from 'app/shared/auth/auth.service';
import { User } from 'app/model/user';
import { UserService } from 'app/shared/user.service';
import { OuterSubscriber } from 'rxjs/OuterSubscriber';
import { Promise } from 'q';
import { Role } from 'app/model/role';

@Injectable()
export class PresentationService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private userService: UserService
  ) { }

  getHeaders() {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getMedicinesToken()
    });
    let httpOptions = {
      headers: headers
    };
    return httpOptions;
  }

  getPresentations(): Observable<Presentation[]> {
    const url = environment.medicines_backend.url + '/api/presentations/detailed';
    return this.http.get<Presentation[]>(url, this.getHeaders()).map(res => {
      let presentations: Presentation[] = new Array();

      let presentationsJSON = JSON.parse(JSON.stringify(res));
      for (var i = 0; i < presentationsJSON.length; i++) {
        presentations[i] = this.mapPresentation(presentationsJSON[i]);
      }

      return presentations;
    });
  }

  getPresentationsByDrug(drug): Observable<Presentation[]> {
    const url = environment.medicines_backend.url + '/api/presentations/detailed';
    return this.http.get<Presentation[]>(url, this.getHeaders()).map(res => {
      let presentations: Presentation[] = new Array();

      let presentationsJSON = JSON.parse(JSON.stringify(res));
      for (var i = 0; i < presentationsJSON.length; i++) {
        if (presentationsJSON[i].drug.name == drug) {
          presentations.push(this.mapPresentation(presentationsJSON[i])
          )}
      }

      return presentations;
    });
  }

  getPresentation(id: String): Observable<Presentation> {
    const url = environment.medicines_backend.url + '/api/presentations/' + id + '/detailed';
    return this.http.get(url, this.getHeaders())
      .map((res: Response) => {
        let presentationJSON = JSON.parse(JSON.stringify(res));
        return this.mapPresentation(presentationJSON);
      });
  }

  mapPresentation(presentationJSON): Presentation {

    let medicines: string[] = new Array();
    for (let i = 0; i < presentationJSON.medicines.length; i++) {
      medicines[i] = presentationJSON.medicines[i].name;
    }

    let posologies: Posology[] = new Array();
    for (let i = 0; i < presentationJSON.posologies.length; i++) {
      let posology: Posology = new Posology(
        presentationJSON.posologies[i].id,
        presentationJSON.posologies[i].dosage,
        presentationJSON.posologies[i].technique,
        presentationJSON.posologies[i].interval,
        presentationJSON.posologies[i].period
      );
      posologies[i] = posology;
    }

    return new Presentation(
      presentationJSON.id, presentationJSON.drug.name, medicines, posologies,
      presentationJSON.form, presentationJSON.concentration, presentationJSON.packageQuantity, presentationJSON.comments);
  }

  postComment(physician: string, comment: string, presentationID: number): Observable<Comment> {
    let url = environment.medicines_backend.url + '/api/comments';

    let body = {
      "physician": physician,
      "text": comment,
      "presentation": presentationID
    }

    return this.http.post(url, body, this.getHeaders()).map((res: Response) => {
      let resJSON = JSON.parse(JSON.stringify(res));
      console.log(resJSON)
      return new Comment(
        resJSON.text,
        new User(resJSON.physician, null, null, null, null)
      );
    });
  }

}
