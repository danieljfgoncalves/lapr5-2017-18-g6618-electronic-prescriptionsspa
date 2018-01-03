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

  getPresentations(): Observable<Presentation[]> {
    const url = environment.medicines_backend.url + '/api/presentations';
    return this.http.get<Presentation[]>(url).map(res => {
      let presentations: Presentation[] = new Array();

      let presentationsJSON = JSON.parse(JSON.stringify(res));
      for(var i = 0; i < presentationsJSON.length; i++) {
        presentations[i] = this.mapPresentation(presentationsJSON[i]);
      }

      return presentations;
    });
  }

  getPresentation(id: number): Observable<Presentation> {
    const url = environment.medicines_backend.url + '/api/presentations/' + `${id}`;
    return this.http.get(url)
    .map((res: Response) => {
      let presentationJSON = JSON.parse(JSON.stringify(res));
      return this.mapPresentation(presentationJSON);
    });
  }

  mapPresentation(presentationJSON): Presentation {

    let medicines: string[] = new Array();
    for(let i=0; i< presentationJSON.medicines.length; i++) {
      medicines[i] = presentationJSON.medicines[i].name;
    }

    let posologies: Posology[] = new Array();
    for(let i=0; i< presentationJSON.medicines.length; i++) {
      let posology: Posology = new Posology(
        presentationJSON.posologies[i].posologyId,
        presentationJSON.posologies[i].quantity,
        presentationJSON.posologies[i].technique,
        presentationJSON.posologies[i].interval,
        presentationJSON.posologies[i].period
      );
      posologies[i] = posology;
    }
    
    return new Presentation(
      presentationJSON.presentationId, presentationJSON.drug.name, medicines, posologies, 
      presentationJSON.form, presentationJSON.concentration, presentationJSON.quantity, null);
  }

  getComments(presentationID: number): Observable<Comment[]> {
    let url = environment.receipts_frontend.url + '/api/comments/presentation/' + `${presentationID}`;
    let httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'x-access-token': this.authService.getToken()
      })
    };

    return this.http.get(url, httpOptions).map((res: Response) => {
      let comments: Comment[] = new Array();

      let commentsJSON = JSON.parse(JSON.stringify(res));
      for(let i = 0; i < commentsJSON.length; i++) {
        
        let roles : Role[] = new Array();
        for(let j = 0; j < commentsJSON[i].physician.roles.length; j++) {
          roles[j] = commentsJSON[i].physician.roles[j];
        }
        let physician: User = new User(
          commentsJSON[i].physician.userID,
          commentsJSON[i].physician.name,
          commentsJSON[i].physician.email,
          commentsJSON[i].physician.mobile,
          roles
        );

        comments[i] = new Comment(
          commentsJSON[i].comment,
          commentsJSON[i].physician
        );
      }

      return comments;
    });
  }

  postComment(comment: string, presentationID: number): Observable<Comment> {
    let url = environment.receipts_frontend.url + '/api/comments';
    let httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'x-access-token': this.authService.getToken()
      })
    };

    let body = {
      "comment":comment,
      "presentationID":presentationID
    }
    return this.http.post(url, body, httpOptions).map((res: Response) => {
      let resJSON = JSON.parse(JSON.stringify(res));
      return new Comment(
        resJSON.comment.comment.comment,
        new User(resJSON.comment.comment.physician, null, null, null, null)
      );
    });
  }

}
