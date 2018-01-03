import { Component, OnInit } from '@angular/core';
import { MedicalReceiptService } from '../../../shared/medical-receipts/medical-receipt.service'
import { MedicalReceipt } from '../../../model/medical-receipt'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-receipts-consult-page',
  templateUrl: './receipts-consult-page.component.html',
  styleUrls: ['./receipts-consult-page.component.scss']
})
export class MedicalReceiptConsultPageComponent implements OnInit {

  private receipts: MedicalReceipt[] = [];

  constructor(private receiptService: MedicalReceiptService) { }

  ngOnInit() {
    this.receiptService.getReceipts().subscribe(receipts => {
      this.receipts = receipts;
    })
  }
}
