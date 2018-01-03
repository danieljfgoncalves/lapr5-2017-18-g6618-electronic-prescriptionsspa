import { Component, OnInit, Input } from '@angular/core';
import { PrescriptionService } from 'app/shared/prescription.service';
import { Prescription } from 'app/model/prescription';

@Component({
  selector: 'app-fills',
  templateUrl: './fills.component.html',
  styleUrls: ['./fills.component.scss']
})
export class FillsComponent implements OnInit {

  @Input() receiptID: string;
  @Input() prescriptionID: string;
  @Input() newFill: string;

  @Input() prescription: Prescription;

  @Input() message: string;

  constructor(private prescriptionService: PrescriptionService) { }

  ngOnInit() {
  }

  searchPrescription() {
    this.prescriptionService.getPrescription(this.receiptID, this.prescriptionID)
    .subscribe(res => this.prescription = res);
  }

  fillPrescription() {
    
    let quantity: number = +this.newFill;
    if(isNaN(quantity)){
      this.message = "Please insert a number of how much you would like to fill.";
      return;
    }

    this.prescriptionService.fillPrescription(this.receiptID, this.prescriptionID, quantity)
    .subscribe(res => this.message = "Quantity successfully filled!", err => this.message = "Fill failed");
  }

}
