import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Presentation } from '../../../model/presentation';
import { PresentationService } from '../../../presentation.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { AuthService } from 'app/shared/auth/auth.service';
import { User } from 'app/model/user';
import { Role } from 'app/model/role';

@Component({
  selector: 'app-presentation-detail',
  templateUrl: './presentation-detail.component.html',
  styleUrls: ['./presentation-detail.component.scss']
})
export class PresentationDetailComponent implements OnInit {
  
  @Input() newComment: string;
  presentation: Presentation;
  user: User;
  physicianRole:string = "physician";
   
  constructor(
    private route: ActivatedRoute,
    private presentationService: PresentationService,
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPresentation();
    this.getUserInfo();
  }

  getPresentation() {
    const id = +this.route.snapshot.paramMap.get('id');

    Observable.forkJoin(
      this.presentationService.getPresentation(id),
      this.presentationService.getComments(id)
    ).subscribe(data => {
      this.presentation = data[0];
      this.presentation.comments = data[1];
    });
  }

  getUserInfo() {
    this.user = this.authService.getUserInfo();
    console.debug(this.user);
  }

  goBack(): void {
    this.location.back();
  }

  submitComment(): void {
    if ((!this.newComment || /^\s*$/.test(this.newComment))) {
      return;
    }
    
    this.presentationService.postComment(this.newComment, this.presentation.id)
    .subscribe(res => window.location.reload(), err => console.log(err));
  }

}
