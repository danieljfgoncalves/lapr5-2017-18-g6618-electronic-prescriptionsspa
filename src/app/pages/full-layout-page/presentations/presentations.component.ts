import { Component, OnInit } from '@angular/core';
import { PresentationService } from '../../../presentation.service'
import { Presentation } from '../../../model/presentation'

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.scss']
})
export class PresentationsComponent implements OnInit {

  presentations: Presentation[];

  constructor(private presentationService: PresentationService) { }

  ngOnInit() {
    this.getPresentations();
  }

  getPresentations(): void {
    this.presentationService.getPresentations()
    .subscribe(presentations => this.presentations = presentations);
  }

}
